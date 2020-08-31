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
export class PostsComponent  {
  id: any;
  title: any;

  constructor(private postServise: PostsService) {
  }

  posts$ = this.postServise.posts$.pipe(
    catchError((error) => {
      console.log(error);
      return of(null);
    })
  );

 
  onSelected(post): void {
    this.postServise.selectedPostChanged(post.id);
    this.id = post.id;
    this.title = post.title;
  }

}
