import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  posts: any;
  private subscription: Subscription;

  constructor(private postServise: PostsService) {
    this.subscription = new Subscription();
  }
  
  ngOnInit() {
    this.getQuery();
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  getQuery() {
    const postsStream$ = this.postServise.query$.subscribe(
      (item) => (this.posts = item),
      (err) => console.log(err)
    );
    // console.log(this.posts);
    this.subscription.add(postsStream$);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
