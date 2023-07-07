import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './registerForm/register-form.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './loginForm/login-form.component';
import { RouterModule } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [RegisterFormComponent, LoginFormComponent],
  imports: [CommonModule, NgxIntlTelInputModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [RegisterFormComponent, LoginFormComponent],
})
export class AuthModule {}
