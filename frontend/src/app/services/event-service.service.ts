import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable()
//{providedIn: 'root'}
export class EventService {
  private originalUsersSubject = new BehaviorSubject<User[]>([]);
  public originalUsers$: Observable<User[]>; //Observable para dados originais

  baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    this.originalUsers$ = this.originalUsersSubject.asObservable();
  }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`).pipe(
      tap((data) => this.originalUsersSubject.next(data)) // Atualiza BehaviorSubject
    );
  }

  filterUsers(filterBy: string): User[] {
    // Remove espaços internos e converte para minúsculas
    const filterByProcessed = filterBy.replace(/\s+/g, '').toLowerCase();

    return this.originalUsersSubject.value
      .map((user) => ({
        ...user,
        events: user.events.filter((event) =>
          event.eventName
            .replace(/\s+/g, '')
            .toLowerCase()
            .includes(filterByProcessed)
        ),
      }))
      .filter((user) => user.events.length > 0);
  }
}
