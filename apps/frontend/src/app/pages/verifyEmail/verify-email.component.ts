/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'alqemam-task-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  // -------------------------------------------------------------------------
  // Public properties
  // -------------------------------------------------------------------------
  verifiedSub!: Subscription;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------
  constructor(
    public ac: ActivatedRoute,
    public router: Router,
    public auth: AuthService,
    public toast: NgToastService,
  ) {}

  // -------------------------------------------------------------------------
  // On Init
  // -------------------------------------------------------------------------
  ngOnInit(): void {
    this.verifiedSub = this.auth.verifyEmail(this.ac.snapshot.params).subscribe({
      next: (res: any) => {
        this.toast.success({ detail: 'verified success', summary: res.message, duration: 2000 });
        this.router.navigateByUrl('/task1');
      },
      error: (err: HttpErrorResponse) => {
        this.toast.success({ detail: 'verified error', summary: err.error.message[0].message, duration: 2000 });
        this.router.navigateByUrl('/task1');
      },
    });
  }

  // -------------------------------------------------------------------------
  // On Destroy
  // -------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.verifiedSub.unsubscribe();
  }
}
