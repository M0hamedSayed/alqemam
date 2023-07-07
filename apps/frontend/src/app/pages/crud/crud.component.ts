/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITodo } from '@alqemam/shared';
import { SortEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

interface IPageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'alqemam-task-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit, OnDestroy {
  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------
  //handle todos data
  todos: ITodo[] = new Array(10).fill({});
  showData!: Subscription;
  disabled = true;
  //search input
  searchStr = '';
  // custom drop down list to detect no of items
  first = 0;

  rows = 10;

  options = [
    { label: 2, value: 2 },
    { label: 4, value: 4 },
    { label: 6, value: 6 },
    { label: 8, value: 8 },
    { label: 10, value: 10 },
    { label: 12, value: 12 },
    { label: 14, value: 14 },
    { label: 16, value: 16 },
    { label: 18, value: 18 },
    { label: 20, value: 20 },
  ];

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------
  constructor(private _crud: CrudService, private _toast: NgToastService) {}

  // -------------------------------------------------------------------------
  // On Init
  // -------------------------------------------------------------------------
  ngOnInit(): void {
    this.showData = this._crud.showData().subscribe({
      next: (res: any) => {
        this.todos = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this._toast.error({ detail: 'error message', summary: 'something wrong please refresh', duration: 2000 });
      },
      complete: () => {
        this.disabled = false;
      },
    });
  }

  // -------------------------------------------------------------------------
  // On Destroy
  // -------------------------------------------------------------------------
  ngOnDestroy(): void {
    this.showData.unsubscribe();
  }

  // -------------------------------------------------------------------------
  // Public methods
  // -------------------------------------------------------------------------
  customSort(event: SortEvent) {
    (event.data as ITodo[]).sort((data1: ITodo, data2: ITodo) => {
      const value1 = data1[event.field as keyof ITodo];
      const value2 = data2[event.field as keyof ITodo];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return (event.order as number) * result;
    });
  }

  onPageChange(event: IPageEvent) {
    this.first = event.first as number;
    this.rows = event.rows as number;
  }
}
