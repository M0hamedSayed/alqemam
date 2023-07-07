/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationAuthService } from '../../../services/validation-auth.service';
import { AuthService } from '../../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'alqemam-task-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------
  loginForm!: FormGroup;
  showPassword = false;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------
  constructor(
    public validator: ValidationAuthService,
    public authService: AuthService,
    public toast: NgToastService,
    public router: Router,
    public user: UserService,
  ) {}

  // -------------------------------------------------------------------------
  //  On Init
  // -------------------------------------------------------------------------
  ngOnInit(): void {
    this.loginForm = this.validator.loginValidation();
  }

  // -------------------------------------------------------------------------
  // Public methods
  // -------------------------------------------------------------------------
  //show errors or not
  isInvalidInput(input: string): boolean {
    return (
      (this.loginForm.controls[input].touched || this.loginForm.controls[input].dirty) &&
      !this.loginForm.controls[input].valid
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const signUpObj = { ...this.loginForm.value };
      this.authService.login(signUpObj).subscribe({
        next: (res: any) => {
          this.toast.success({ detail: 'success message', summary: res?.message, duration: 2000 });
          this.user.authChecked = true;
          this.user.loggedIn = true;
          this.user.currentUser = res.data;
          this.onReset();
          this.router.navigateByUrl('/task1/home');
        },
        error: (error: HttpErrorResponse) => {
          this.toast.error({
            detail: 'error message',
            summary: error.error.message[0].message,
            duration: 5000,
          });
        },
      });
    } else this.validator.validateAllFormFields(this.loginForm);
  }

  onReset() {
    this.loginForm.reset();
  }
}
