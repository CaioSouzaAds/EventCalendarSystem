import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  get noEventsFound(): boolean {
    return (
      this.users.length === 0 ||
      this.users.every((user) => user.events.length === 0)
    );
  }

  getUsers(): void {
    this.http.get<User[]>('http://localhost:8080/users').subscribe({
      next: (data) => (this.users = data),
      error: (error) => console.error('There was an error!', error),
    });
  }
}
