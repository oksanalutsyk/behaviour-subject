import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private _navItemSource = new BehaviorSubject<string>('')
  query$ = this._navItemSource.asObservable()
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private url  ='https://jsonplaceholder.typicode.com/posts?_limit='

  constructor(private http: HttpClient) { }

  search(query):Observable<any>{
    return this.http.get(`${this.url}${query}`, query)
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  changeQueryParameter(query:any){
    this._navItemSource.next(query)
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
