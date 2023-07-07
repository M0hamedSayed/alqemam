import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authChecked = false;
  loggedIn = false;
  currentUser = {};

  constructor(public http: HttpClient, @Inject('baseURL') public baseURl: string) {}

  me() {
    return this.http.get(`${this.baseURl}me`, { withCredentials: true });
  }

  reset() {
    this.authChecked = false;
    this.loggedIn = false;
    this.currentUser = {};
  }
}
