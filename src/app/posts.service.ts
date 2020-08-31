import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import {
  map,
  tap,
  catchError,
  shareReplay,
  
} from 'rxjs/operators';
import { PostsInterfaces } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // private _navItemSource = new BehaviorSubject<string>('')
  // query$ = this._navItemSource.asObservable()
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

  constructor(private http: HttpClient) {}

  posts$ = this.http.get<PostsInterfaces[]>(this.url).pipe(
    tap(console.log),
    catchError((error) => of([]))
  );

  postId$ = this.http.get<PostsInterfaces[]>(this.url).pipe(
    tap((data) => console.log('data', JSON.stringify(data))),
    // shareReplay(1),
    catchError((error) => of([]))
  );

  postWithId$ = combineLatest([this.posts$, this.postId$]).pipe(
    map(([posts, ids]) =>
      posts.map((posts) => ({
        ...posts,
        title: posts.title,
        id: ids.find((c) => posts.id === c.id).name,
      }))
    ),
    shareReplay(1)
  );


  private postSelectedSubject = new BehaviorSubject<number>(0);
  postSelectedAction$ = this.postSelectedSubject.asObservable();

  selectedPost$ = combineLatest([
    this.postWithId$ ,
    this.postSelectedAction$
  ]).pipe(
    map(([posts, selectedPostId]) =>
    posts.find(post => post.id === selectedPostId)
    ),
    tap(post => console.log('selectedPost', post)),
    shareReplay(1)
  );

  selectedPostChanged(selectedPostId:any): void {
    this.postSelectedSubject.next(selectedPostId);
  }

  // getPosts(): Observable<PostsInterfaces[]> {
  //   return this.http.get<PostsInterfaces[]>(this.url).pipe(
  //     tap(console.log),
  //     catchError((error) => of([]))
  //   );
  // }

  // search(query):Observable<any>{
  //   return this.http.get(`${this.url}${query}`, query)
  // }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // changeQueryParameter(query:any){
  //   this._navItemSource.next(query)
  // }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
