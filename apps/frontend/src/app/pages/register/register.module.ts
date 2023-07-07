import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { AuthModule } from '../../components/auth/auth.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RegisterFormComponent } from '../../components/auth/registerForm/register-form.component';
import { LoginFormComponent } from '../../components/auth/loginForm/login-form.component';
import { NotAuthGuard } from '../../guards/not-auth.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
  { path: '', redirectTo: '/task1/home', pathMatch: 'full' },
  {
    path: '',
    children: [
      { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: '',
        component: RegisterComponent,

        children: [
          { path: 'signup', component: RegisterFormComponent, canActivate: [NotAuthGuard] },
          { path: 'login', component: LoginFormComponent, canActivate: [NotAuthGuard] },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, AuthModule, DashboardModule, ButtonModule, RouterModule.forChild(routes)],
  exports: [RegisterComponent, DashboardModule],
})
export class RegisterModule {}
