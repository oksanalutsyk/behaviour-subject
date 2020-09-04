import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { PostsService } from '../shared/services/posts.service';
import { PostInterface } from '../shared/interfaces/post.interface';
import { AddPostComponent } from '../add-post/add-post.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SuccessAddComponent } from '../snack-bar/success-add/success-add.component';

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
  checked: boolean;

  page: number = 1;
  //snack-bar
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action = 'deleted';

  private subscription: Subscription;

  constructor(
    private postServise: PostsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
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
      this.openSnackBar(data);
    });
    this.subscription.add(postsStream$);
    this.getPosts();
  }

  openSnackBar(data) {
    this._snackBar.openFromComponent(SuccessAddComponent, {
      duration: this.durationInSeconds * 1000,
      data: { data:data, message: this.action },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openEditDialog(post): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '1000px',
      data: { title: post.title, body: post.body, id: post._id, checked:this.checked },
    });
    const postsStream$ = dialogRef
      .afterClosed()
      .pipe(
        switchMap((data) => {
          if (data !== undefined) {
            return this.postServise.updatePost(post._id, data);
          }
          return [];
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
      data: { title: this.title, body: this.body, checked:this.checked },
    });
    const postsStream$ = dialogRef
      .afterClosed()
      .pipe(
        switchMap((data) => {
          if (data !== undefined) {
            console.log('add', data);
            return this.postServise.addNewPost(data);
          }
          return [];
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
