import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './verify-email.component';
import { SharedModule } from '../../components/shared/shared.module';

@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [CommonModule, SharedModule],
  exports: [VerifyEmailComponent],
})
export class VerifyEmailModule {}
