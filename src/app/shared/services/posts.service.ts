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
  private url = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
  getPostById(id:string):Observable<any> {
    return this.http.get(`${this.url}/${id}`)
  }
  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  updatePost(id: string, post: any): Observable<any> {
    return this.http.patch(`${this.url}/update/${id}`, post);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  changeQueryParameter(query: any) {
    this._navItemSource.next(query);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  search(query): Observable<any> {
    return this.http.get(`${this.url}${query}`, query);
  }
}
