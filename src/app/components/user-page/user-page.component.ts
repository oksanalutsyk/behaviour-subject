import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserInterface } from '../../shared/interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  userId: string;
  user: UserInterface;
  isLogin = false;

  token: string;
  data;

  private subscription: Subscription;

  constructor(private authServise: AuthService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.data = localStorage.getItem('user');
    if (this.data) {
      this.token = JSON.parse(this.data).token;
      const isLoading$ = this.authServise.isLoadingQuery$.subscribe(
        (item) => (this.isLogin = item.query),
        (err) => console.log(err)
      );
      if (this.token) {
        this.isLogin = true
        this.userId = JSON.parse(this.data).id;
        this.authServise
          .getUserById(this.userId, this.token)
          .subscribe((user) => {
            this.user = user;
          });
      }
      this.subscription.add(isLoading$);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
