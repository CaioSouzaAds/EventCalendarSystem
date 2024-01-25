import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { EventService } from '../services/event-service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  constructor(private eventService: EventService) {}
  users: User[] = [];
  originalUsers: User[] = []; // Nova variável para manter os dados originais
  listFilter: string = '';

  ngOnInit() {
    this.eventService.loadUsers().subscribe((data: User[]) => {
      console.log(data); // Log the received data to the console
      this.users = data;
      this.originalUsers = data; // Atualize a lista original
    });
  }

  get noEventsFound(): boolean {
    return (
      this.users.length === 0 ||
      this.users.every((user) => user.events.length === 0)
    );
  }

  filterUsers(): void {
    this.users = this.eventService.filterUsers(this.listFilter.trim());
  }
}
