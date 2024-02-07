import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { User } from '../models/identity/User'; // Ajuste conforme necessário
import { UserLogin } from '../models/identity/UserLogin';
import { UserRegister } from '../models/identity/UserRegister';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  public currentUser$ = this.currentUserSource.asObservable();
  private baseUrl = 'api';

  constructor(private http: HttpClient) {
    this.initializeUserFromLocalStorage();
  }

  private initializeUserFromLocalStorage(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.currentUserSource.next(user);
    }
  }

  public register(model: UserRegister): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/register`, model).pipe(
      take(1),
      map(() => {
        console.log('Registro bem-sucedido');
      })
    );
  }

  public setCurrentUser(user: User | null, token: string | null = null): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    } else {
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
    }

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  public login(model: UserLogin): Observable<User> {
    return this.http
      .post<{ user: User; token: string }>(`${this.baseUrl}/auth/login`, model)
      .pipe(
        take(1),
        map((response) => {
          if (response && response.user && response.token) {
            this.setCurrentUser(response.user, response.token);
            return response.user;
          } else {
            throw new Error('User not found');
          }
        })
      );
  }

  public logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }
}
