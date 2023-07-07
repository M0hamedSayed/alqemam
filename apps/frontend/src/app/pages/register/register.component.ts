import { Component, Inject } from '@angular/core';

@Component({
  selector: 'alqemam-task-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(@Inject('baseURL') public baseURL: string) {}
}
