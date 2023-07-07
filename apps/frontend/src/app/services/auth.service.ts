/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ISignup } from '@alqemam/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient, @Inject('baseURL') public baseURl: string) {}

  register(signupData: ISignup) {
    return this.http.post<ISignup>(`${this.baseURl}signup`, signupData);
  }

  login(loginData: ILogin) {
    return this.http.post<ILogin>(`${this.baseURl}login`, loginData, { withCredentials: true });
  }

  verifyEmail({ id, otp }: any) {
    return this.http.get(`${this.baseURl}user/verify/${id}/${otp}`, { withCredentials: true });
  }

  logout() {
    return this.http.get(`${this.baseURl}logout`, { withCredentials: true });
  }
}
