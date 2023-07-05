import passport from 'passport';
import facebook, { Profile } from 'passport-facebook';
import config from '../config/env-config';
import { User } from '../config/db-config';
import { FunctionLike } from '../../types';

const facebookStrategy = facebook.Strategy;

const authOptionsFb = {
  callbackURL: '/auth/facebook/callback',
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  profileFields: [
    'id',
    'email',
    'link',
    'displayName',
    'name',
    'address',
    'gender',
    'picture.type(large)',
    'location',
    'birthday',
    'age_range',
    'hometown',
  ],
};

//verify call back facebook
const verifyCallBackFb = async (_accessToken: string, _refreshToken: string, profile: Profile, done: FunctionLike) => {
  /* //todo :
          find email if exist
              >> find facebook id if exist return user
              >> if not exist update facebook id and userInfoFb
          if email not exist return new user */
  try {
    let user = await User.findOne({ where: { email: profile.emails[0].value } });
    if (user) {
      if (user.facebookID) {
        Object.assign(user, { firstRegistration: false });
        user = User.build({ ...user });
        await user.save({ validate: false });
        return done(null, { ...user.userData() });
      } else {
        Object.assign(
          user,
          profile.id && { facebookID: profile['id'] },
          profile._json && { facebookInfo: profile._json },
          profile.photos && user.image == '' && { image: profile.photos[0].value },
          { emailVerified: true, firstRegistration: false },
        );
        user = User.build({ ...user });
        await user.save({ validate: false });
        return done(null, { ...user.userData() });
      }
    } else {
      user = User.build({
        facebookID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: profile.photos[0].value || '',
        emailVerified: true,
        facebookInfo: { ...profile._json },
        firstRegistration: true,
      });
      await user.save({ validate: false });
      return done(null, { ...user.userData() });
    }
  } catch (error: unknown) {
    done(error);
  }
};

export const init = () => {
  passport.use(new facebookStrategy(authOptionsFb, verifyCallBackFb));
  return passport;
};
