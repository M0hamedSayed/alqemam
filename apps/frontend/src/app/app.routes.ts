/* eslint-disable @typescript-eslint/typedef */
import { Route } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CrudComponent } from './pages/crud/crud.component';
import { VerifyEmailComponent } from './pages/verifyEmail/verify-email.component';
import { NotAuthGuard } from './guards/not-auth.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/home/home.module').then(p => p.HomeModule),
  },
  { path: 'task1', loadChildren: () => import('./pages/register/register.module').then(p => p.RegisterModule) },
  { path: 'task2', component: CrudComponent },
  { path: 'user/verify/:id/:otp', component: VerifyEmailComponent, canActivate: [NotAuthGuard] },

  { path: '**', component: NotfoundComponent },
];
