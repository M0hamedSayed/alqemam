/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'alqemam-task-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------
  constructor(
    private _auth: AuthService,
    private _route: Router,
    private _toast: NgToastService,
    private _user: UserService,
  ) {}

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------
  logout() {
    this._auth.logout().subscribe({
      next: (data: any) => {
        this._toast.success({ detail: 'logout success', summary: data.message, duration: 2000 });
        // reset user
        this._user.reset();
        this._route.navigateByUrl('/tasks');
      },
      error: (err: HttpErrorResponse) => {
        this._toast.error({
          detail: 'logout failure',
          summary: err.error.message[0].message || err.error.message,
          duration: 2000,
        });
      },
    });
  }
}
