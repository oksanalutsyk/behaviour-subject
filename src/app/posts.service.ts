import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private _navItemSource = new BehaviorSubject<any>('');
  query$ = this._navItemSource.asObservable();
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  
  getPosts(): Observable<any> {
    return this.http.get(`${this.url}/posts`);
  }
  deletePost(id:string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  changeQueryParameter(query: any) {
    this._navItemSource.next(query);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



  search(query): Observable<any> {
    return this.http.get(`${this.url}/posts${query}`, query);
  }
}
