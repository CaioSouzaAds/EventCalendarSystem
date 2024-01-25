import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private originalUsersSubject = new BehaviorSubject<User[]>([]);
  public originalUsers$: Observable<User[]>; //Observable para dados originais

  constructor(private http: HttpClient) {
    this.originalUsers$ = this.originalUsersSubject.asObservable();
  }

  loadUsers(): Observable<User[]> {
    // Para retornar um Observable
    return this.http.get<User[]>('http://localhost:8080/users');
  }

  filterUsers(filterBy: string): User[] {
    const filterByLower = filterBy.toLowerCase();
    return this.originalUsersSubject.value.filter((user) =>
      user.events.some((event) =>
        event.eventName.toLowerCase().includes(filterByLower)
      )
    );
  }
}
