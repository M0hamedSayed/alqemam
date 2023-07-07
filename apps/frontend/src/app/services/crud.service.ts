import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private _http: HttpClient) {}

  showData() {
    return this._http.get('https://jsonplaceholder.typicode.com/todos');
  }
}
