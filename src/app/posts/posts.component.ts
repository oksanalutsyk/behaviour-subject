import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Subscription, of, combineLatest } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { PostsInterfaces } from '../post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  posts: any;
  id: any;
  private subscription: Subscription;

  constructor(private postServise: PostsService) {
    this.subscription = new Subscription();
  }

  posts$ = this.postServise.posts$.pipe(
    catchError((error) => {
      console.log(error);
      return of(null);
    })
  );

  ngOnInit() {
    this.getQuery();
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  getQuery() {
    // const postsStream$ = this.postServise.query$.subscribe(
    //   (item) => (this.posts = item),
    //   (err) => console.log(err)
    // );
    // // console.log(this.posts);
    // this.subscription.add(postsStream$);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  onSelected(postId: string): void {
    this.postServise.selectedPostChanged(postId);
    this.id = postId;
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
