import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/auth';
  private loginUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  addUser(user: UserInterface): Observable<UserInterface[]> {
    return this.http.post<UserInterface[]>(`${this.registerUrl}`, user);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}`, data)
  }
  getUserById(id: string): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.registerUrl}/${id}`);
  }
}
