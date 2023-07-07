/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, catchError, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------
  loader = false;

  // -------------------------------------------------------------------------
  // Constructor
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
   * if no validate can access to login and signup page
   * if validate can access to home page
   * @returns observable
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
          return true;
        }),
        catchError((err: any, _caught: any) => {
          console.log(err);
          this._user.authChecked = true;
          this._user.loggedIn = false;
          return this._router.navigateByUrl('/task1/login');
        }),
      );
    }
    if (this._user.authChecked && !this._user.loggedIn) {
      this._router.navigateByUrl('/task1/login');
      return false;
    }
    return true;
  }
}
