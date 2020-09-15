import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PostInterface } from '../interfaces/post.interface';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private navItemSource = new BehaviorSubject<any>('');
  query$ = this.navItemSource.asObservable();
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private url = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(`${this.url}`);
  }
  getPostById(id: string): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(`${this.url}/${id}`);
  }
  deletePost(id: string): Observable<PostInterface[]> {
    return this.http.delete<PostInterface[]>(`${this.url}/${id}`);
  }
  updatePost(id: string, post: any): Observable<PostInterface[]> {
    return this.http.patch<PostInterface[]>(`${this.url}/update/${id}`, post);
    // .pipe(
    //   switchMap(() => this.getPosts()),
    //   catchError((err) => of(err))
    // );
  }
  addNewPost(post: PostInterface): Observable<PostInterface[]> {
    return this.http.post<PostInterface[]>(`${this.url}`, post);
    // .pipe(
    //   switchMap(() => this.getPosts()),
    //   catchError((err) => of(err))
    // );
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  changeQueryParameter(query: any) {
    this.navItemSource.next(query);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
