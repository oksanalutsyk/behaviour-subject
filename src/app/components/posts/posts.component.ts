import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostsService } from '../../shared/services/posts.service';
import { PostInterface } from '../../shared/interfaces/post.interface';
import { SuccessAddComponent } from '../../components/snack-bar/success-add/success-add.component';
import { AuthService } from '../../shared/services/auth.service';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { UnsuccessComponent } from '../snack-bar/unsuccess/unsuccess.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
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
  //user
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
    const data = localStorage.getItem('user');
    if (data) {
      this.authServise.changeIsLoadingQueryParameter(true);
      this.getPosts();
    }
  }
  getPosts(): void {
    const stream$ = this.postServise.query$.subscribe(
      (item) => ((this.posts = item)),
      (err) => console.log(err)
    );
    const isLoading$ = this.authServise.isLoadingQuery$.subscribe(
      (query) => ((this.isLogin = query)),
      (err) => console.log(err)
    );
    const postsStream$ = this.postServise
      .getPosts()
      .subscribe((data) => {
        console.log(data)
        this.postServise.changeQueryParameter(data);
      });
    this.subscription.add(postsStream$);
    this.subscription.add(stream$);
    this.subscription.add(isLoading$);
  }

  deletePost(id): void {
    const postsStream$ = this.postServise.deletePost(id).subscribe((data:any) => {
      console.log(data)
      if(data.message){
        this.openSuccessSnackBar(data);
      }
      this.postServise.changeQueryParameter(data);
    });
    this.subscription.add(postsStream$);
  }

  openSuccessSnackBar(data) {
    this._snackBar.openFromComponent(SuccessAddComponent, {
      duration: this.durationInSeconds * 1000,
      data: { data: data, message: this.action },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['success-snackbar']
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
      .subscribe((data:any) => {
        if(data.message){
          this.openSuccessSnackBar(data);
        }
        this.postServise.changeQueryParameter(data);
      });
    this.subscription.add(postsStream$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
