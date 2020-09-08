import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  addUser(user:UserInterface):Observable<UserInterface[]> {
    return this.http.post<UserInterface[]>(`${this.url}`, user)
  }
}
