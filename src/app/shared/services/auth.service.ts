import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { PostsService } from './posts.service';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/auth';
  private loginUrl = 'http://localhost:3000/login';

  private isLoadingSubject = new BehaviorSubject<any>('');
  isLoadingQuery$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient, private postService: PostsService) {}

  addUser(user: UserInterface): Observable<UserInterface[]> {
    return this.http.post<UserInterface[]>(`${this.registerUrl}`, user);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}`, data);
  }
  getUserById(id: string, token: string): Observable<any> {
    return this.http.get<any>(`${this.registerUrl}/${id}`, {
      headers: new HttpHeaders().set('x-auth-token', token),
    });
  }

  changeIsLoadingQueryParameter(query: any, id?: string) {
    this.isLoadingSubject.next({ query: query, id: id });
  }
}
