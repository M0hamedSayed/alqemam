/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationAuthService {
  loginValidation = () => {
    return new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
      ]),
    });
  };

  signUpValidation = () => {
    return new FormGroup(
      {
        firstName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z]+$/),
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z]+$/),
        ]),
        phoneNumber: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/),
        ]),
        passwordConfirm: new FormControl(null, [Validators.required]),
        terms: new FormControl(false, [Validators.required]),
      },
      { validators: this.matchPassword },
    );
  };

  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');
    if (password && passwordConfirm) {
      if (password.pristine || passwordConfirm.pristine) {
        return null;
      }

      if (password.value === passwordConfirm.value) {
        return null;
      }
      return { matchError: true };
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field: string | readonly (string | number)[]) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
