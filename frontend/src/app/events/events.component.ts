import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { EventService } from '../services/event-service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  users: User[] = [];
  listFilter: string = '';

  constructor(private http: HttpClient, private eventService: EventService) {}

  ngOnInit() {
    this.eventService.loadUsers().subscribe((data: User[]) => {
      console.log(data); // Log the received data to the console
      this.users = data;
    });
  }

  get noEventsFound(): boolean {
    return (
      this.users.length === 0 ||
      this.users.every((user) => user.events.length === 0)
    );
  }

  filterUsers(): void {
    const filterByLower = this.listFilter.toLowerCase(); // Converte o filtro para minúsculas
    this.users = this.eventService.filterUsers(filterByLower);
  }
}
