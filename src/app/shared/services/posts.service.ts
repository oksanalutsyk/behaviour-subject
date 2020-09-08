import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PostInterface } from '../interfaces/post.interface';

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
  getPostById(id: string): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(`${this.url}/${id}`);
  }
  deletePost(id: string): Observable<PostInterface[]> {
    return this.http.delete<PostInterface[]>(`${this.url}/${id}`);
  }
  updatePost(id: string, post: any): Observable<PostInterface[]> {
    return this.http.patch<PostInterface[]>(`${this.url}/update/${id}`, post);
  }
  addNewPost(post: PostInterface): Observable<PostInterface[]> {
    return this.http.post<PostInterface[]>(`${this.url}`, post);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  changeQueryParameter(query: any) {
    this._navItemSource.next(query);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
