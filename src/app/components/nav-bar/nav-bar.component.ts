import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostsService } from 'src/app/shared/services/posts.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { of, Subscription } from 'rxjs';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  title: string;
  body: string;
  checked: boolean;
  image: string;

  name: string;
  password: string;

  loginUser;

  isLogin = false;

  private subscription: Subscription;

  constructor(
    private authServise: AuthService,
    private postServise: PostsService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '1000px',
      data: { name: this.name, password: this.password },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        if (user.name && user.password) {
          // this.isLogin = true;
          this.authServise.login(user).subscribe(
            (data) => {
              if (data.id !== undefined) {
                this.loginUser = user.name;
                console.log(this.loginUser)
                this.isLogin = data.isLogin;
                this.authServise.changeIsLoadingQueryParameter(data.isLogin, data.id);
                console.log('Login', this.isLogin);
                this.router.navigate(['/userPage'], {
                  state: { data: { userId: data.id } },
                });
              }
            },
            (err) => console.log(err)
          );
        }
      }
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '1000px',
      data: {
        title: this.title,
        body: this.body,
        image: this.image,
        checked: this.checked,
      },
      disableClose: true,
    });
    const postsStream$ = dialogRef
      .afterClosed()
      .pipe(
        switchMap((data) => {
          if (data.title && data.body && data.image) {
            console.log('add', data);
            return this.postServise.addNewPost(data);
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
  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '1000px',
      data: { name: this.name, password: this.password },
      disableClose: true,
    });
    const postsStream$ = dialogRef
      .afterClosed()
      .pipe(
        switchMap((user) => {
          if (user) {
            if (user.name && user.password) {
              console.log('add', user);
              this.isLogin = true;
              return this.authServise.addUser(user);
            }
          }
          return of([]);
        })
      )
      .subscribe((result) => {
        console.log(result);
      });
    this.subscription.add(postsStream$);
  }
  logOut(): void {
    this.isLogin = false;
    this.authServise.changeIsLoadingQueryParameter(false);
    console.log('Login', this.isLogin);
  }
}
