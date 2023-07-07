/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard {
  // -------------------------------------------------------------------------
  // Public properties
  // -------------------------------------------------------------------------
  loader = false;

  // -------------------------------------------------------------------------
  // constructor
  // -------------------------------------------------------------------------
  constructor(private _user: UserService, private _router: Router) {}

  // -------------------------------------------------------------------------
  // Public methods
  // -------------------------------------------------------------------------
  /**
   *
   * @method CanActivate
   * first time in app
   * --> call me end point to validate token
   * if no validate (catch error) return observable<true> & can access to login and signup page
   * if validate can access to home page
   * @returns observable<boolean>
   */
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._user.authChecked) {
      return this._user.me().pipe(
        map((data: any) => {
          console.log(data);
          this._user.authChecked = true;
          this._user.loggedIn = true;
          this._user.currentUser = { id: data.id, email: data.email, fullName: data.fullName };
          this._router.navigateByUrl('/task1/home');
          return false;
        }),
        catchError((err: any, _caught: any) => {
          console.log(err);
          this._user.authChecked = true;
          this._user.loggedIn = false;
          return of(true);
        }),
      );
    }
    if (this._user.authChecked && this._user.loggedIn) {
      this._router.navigateByUrl('/task1/home');
      return false;
    }
    return true;
  }
}
