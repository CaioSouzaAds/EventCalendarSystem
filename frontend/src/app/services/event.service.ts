import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { EventData } from '../models/eventData.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private originalUsersSubject = new BehaviorSubject<User[]>([]);
  public originalUsers$: Observable<User[]> =
    this.originalUsersSubject.asObservable();

  private baseURL = 'api';

  constructor(private http: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`).pipe(
      tap((data) => this.originalUsersSubject.next(data)),
      catchError((error) => {
        console.error('Error loading users', error);
        return throwError(() => new Error('Error loading users'));
      }),
      take(1)
    );
  }

  filterUsers(filterBy: string): User[] {
    const filterByProcessed = filterBy.replace(/\s+/g, '').toLowerCase();
    return this.originalUsersSubject.value.filter((user) =>
      user.events.some((event) =>
        event.eventName
          .replace(/\s+/g, '')
          .toLowerCase()
          .includes(filterByProcessed)
      )
    );
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/events/${eventId}`).pipe(
      catchError((error) => {
        return throwError(() => new Error('Error deleting event'));
      }),
      take(1)
    );
  }

  putEvent(eventId: number, eventData: EventData): Observable<EventData> {
    return this.http
      .put<EventData>(`${this.baseURL}/events/${eventId}`, eventData)
      .pipe(
        catchError((error) => {
          console.error('Error updating event', error);
          return throwError(() => new Error('Error updating event'));
        }),
        take(1)
      );
  }

  postEvent(userId: number, eventData: EventData): Observable<EventData> {
    return this.http
      .post<EventData>(`${this.baseURL}/events/${userId}`, eventData)
      .pipe(
        catchError((error) => {
          console.error('Error posting event', error);
          return throwError(() => new Error('Error posting event'));
        }),
        take(1)
      );
  }

  getEventById(eventId: number): Observable<EventData> {
    return this.http.get<EventData>(`${this.baseURL}/events/${eventId}`).pipe(
      catchError((error) => {
        console.error('Error getting event', error);
        return throwError(() => new Error('Error getting event'));
      }),
      take(1)
    );
  }
}
