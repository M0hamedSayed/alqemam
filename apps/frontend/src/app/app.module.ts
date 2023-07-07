import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { CrudModule } from './pages/crud/crud.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundModule } from './pages/notfound/notfound.module';
import { VerifyEmailModule } from './pages/verifyEmail/verify-email.module';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    NgToastModule,
    HttpClientModule,
    CrudModule,
    SharedModule,
    VerifyEmailModule,
    NotfoundModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [{ provide: 'baseURL', useValue: 'https://localhost:3000/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
