import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { PostsService } from '../shared/services/posts.service';
import { PostInterface } from '../shared/interfaces/post.interface';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  posts: PostInterface[];
  title: string;
  body: string;

  private subscription: Subscription;

  constructor(private postServise: PostsService, public dialog: MatDialog) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.getPosts();
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  getPosts(): void {
    const stream$ = this.postServise.query$.subscribe(
      (item) => ((this.posts = item), console.log(item)),
      (err) => console.log(err)
    );
    const postsStream$ = this.postServise.getPosts().subscribe((data) => {
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.postServise.changeQueryParameter(data);
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
    this.subscription.add(postsStream$);
    this.subscription.add(stream$);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  deletePost(id): void {
    const postsStream$ = this.postServise.deletePost(id).subscribe((data) => {
      console.log(data);
    });
    this.subscription.add(postsStream$);
    this.getPosts();
  }

  openEditDialog(post): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '1000px',
      data: { title: post.title, body: post.body, id: post._id },
    });
    const postsStream$ = dialogRef
      .afterClosed()
      .pipe(
        switchMap((data) => {
          return this.postServise.updatePost(post._id, data);
        })
      )
      .subscribe((data) => {
        console.log('update', data);
        this.getPosts();
      });
    this.subscription.add(postsStream$);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '1000px',
      data: { title: this.title, body: this.body },
    });

    const postsStream$ = dialogRef
      .afterClosed()
      .pipe(
        switchMap((data) => {
          console.log('add', data);
          return this.postServise.addNewPost(data);
        })
      )
      .subscribe((data) => {
        console.log('update', data);
        this.getPosts();
      });
    this.subscription.add(postsStream$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
