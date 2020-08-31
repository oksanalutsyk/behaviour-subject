import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { PostsInterfaces } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postSelectedSubject = new BehaviorSubject<number>(0);
  postSelectedAction$ = this.postSelectedSubject.asObservable();

  private url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

  constructor(private http: HttpClient) {}

  posts$ = this.http.get<PostsInterfaces[]>(this.url).pipe(
    tap(console.log),
    catchError((error) => of([]))
  );

  postWithId$ = combineLatest([this.posts$]).pipe(
    map(([posts]) =>
      posts.map((posts) => ({
        ...posts,
        id: posts.find((c) => posts.id === c.id).name,
      }))
    ),
    shareReplay(1)
  );

  selectedPostChanged(selectedPostId: any): void {
    this.postSelectedSubject.next(selectedPostId);
  }
}
