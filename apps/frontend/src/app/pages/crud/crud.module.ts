import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';
import { ArrayFilterPipe } from '../../pipes/array-filter.pipe';

@NgModule({
  declarations: [CrudComponent, ArrayFilterPipe],
  imports: [CommonModule, TableModule, ButtonModule, PaginatorModule, SkeletonModule, RouterModule],
  exports: [CrudComponent],
})
export class CrudModule {}
