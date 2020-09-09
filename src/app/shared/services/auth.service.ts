import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';

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
  login(user:UserInterface): Observable<UserInterface[]>{
    console.log(user)
    return this.http.post<UserInterface[]>(`${this.loginUrl}`, user);

  }

}
