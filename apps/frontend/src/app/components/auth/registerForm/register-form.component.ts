/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ValidationAuthService } from '../../../services/validation-auth.service';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'alqemam-task-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------
  signupForm!: FormGroup;
  // phone number configuration
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  //show password icons
  showPassword = false;
  showPasswordConfirm = false;
  //handle terms
  applyTerms = false;
  termsFailure = false;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------
  constructor(
    private validator: ValidationAuthService,
    private authService: AuthService,
    private toast: NgToastService,
    public router: Router,
  ) {}

  // -------------------------------------------------------------------------
  // ON Init
  // -------------------------------------------------------------------------
  ngOnInit() {
    this.signupForm = this.validator.signUpValidation();
  }

  // -------------------------------------------------------------------------
  // Public methods
  // -------------------------------------------------------------------------
  customPhoneStyle() {
    const defaultStyle =
      'block w-full rounded-2xl border-gray-500 border-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2 lg:ps-4';

    if (this.isInvalidInput('phoneNumber') && this.signupForm.controls['phoneNumber'].touched)
      return defaultStyle + ' is-invalid';
    return defaultStyle;
  }

  isInvalidInput(input: string): boolean {
    return (
      (this.signupForm.controls[input].touched || this.signupForm.controls[input].dirty) &&
      !this.signupForm.controls[input].valid
    );
  }

  onSubmit() {
    this.termsFailure = true;
    if (this.signupForm.valid && this.signupForm.controls['terms'].value) {
      const signUpObj = { ...this.signupForm.value };
      console.log(signUpObj);
      delete signUpObj.terms;
      signUpObj.phoneNumber = this.signupForm.value.phoneNumber.number;
      signUpObj.country = this.signupForm.value.phoneNumber.countryCode;

      this.authService.register(signUpObj).subscribe({
        next: (res: any) => {
          this.toast.success({ detail: 'success message', summary: res?.message, duration: 2000 });
          this.onReset();
          this.router.navigateByUrl('/task1/login');
        },
        error: (error: HttpErrorResponse) => {
          this.toast.error({ detail: 'error message', summary: error.error.message[0].message, duration: 5000 });
          this.onReset();
        },
      });
    } else this.validator.validateAllFormFields(this.signupForm);
  }

  onReset() {
    this.termsFailure = false;
    this.signupForm.reset();
  }
}
