/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable, filter, map, of } from 'rxjs';

@Component({
  selector: 'alqemam-task-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean> = of(false);
  constructor(private _router: Router) {}

  ngOnInit() {
    this.loading$ = this._router.events.pipe(
      filter(
        (e: any) =>
          e instanceof NavigationStart ||
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError,
      ),
      map((e: any) => e instanceof NavigationStart),
    );
  }
}
