import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

import { Subscription, of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { PostsService } from '../../shared/services/posts.service';
import { PostInterface } from '../../shared/interfaces/post.interface';
import { SuccessAddComponent } from '../../components/snack-bar/success-add/success-add.component';
import { AuthService } from '../../shared/services/auth.service';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

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
  image: string;

  page: number = 1;
  //snack-bar
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action = 'deleted';

  isLoading = false;
  isLogin = false;

  name: string;
  password: string;

  private subscription: Subscription;

  constructor(
    private postServise: PostsService,
    private authServise: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.getPosts();
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  getPosts(): void {
    // this.isLoading = true;
    const stream$ = this.postServise.query$.subscribe(
      (item) => ((this.posts = item), console.log(item)),
      (err) => console.log(err)
    );
    const isLoading$ = this.authServise.isLoadingQuery$.subscribe(
      (item) => ((this.isLogin = item), console.log(this.isLogin)),
      (err) => console.log(err)
    )
    const postsStream$ = this.postServise
      .getPosts()
      .pipe(delay(1000))
      .subscribe((data) => {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.postServise.changeQueryParameter(data);
        // this.isLoading = false;
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      });
    this.subscription.add(postsStream$);
    this.subscription.add(stream$);
    this.subscription.add(isLoading$);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  deletePost(id): void {
    const postsStream$ = this.postServise.deletePost(id).subscribe((data) => {
      this.openSnackBar(data);
      this.postServise.changeQueryParameter(data);
    });
    this.subscription.add(postsStream$);
  }

  openSnackBar(data) {
    this._snackBar.openFromComponent(SuccessAddComponent, {
      duration: this.durationInSeconds * 1000,
      data: { data: data, message: this.action },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openEditDialog(post): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '1000px',
      data: {
        title: post.title,
        body: post.body,
        id: post._id,
        checked: this.checked,
      },
      disableClose: true,
    });
    const postsStream$ = dialogRef
      .afterClosed()
      .pipe(
        switchMap((data) => {
          if (data.title && data.body && data.image) {
            return this.postServise.updatePost(post._id, data);
          }
          return of([]);
        })
      )
      .subscribe((data) => {
        console.log('update', data);
        this.postServise.changeQueryParameter(data);
      });
    this.subscription.add(postsStream$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
