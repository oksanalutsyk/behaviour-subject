import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserInterface } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  userId: string;
  user: UserInterface;
  isLogin:false;

  constructor(private authServise: AuthService) {}

  ngOnInit(): void {
    console.log('user page')
    const isLoading$ = this.authServise.isLoadingQuery$.subscribe(
      (item) => ((this.isLogin = item), console.log(this.isLogin)),
      (err) => console.log(err)
    )
    // console.log(history.state);
    // user id
    if (this.isLogin) {
      this.userId = history.state.data.userId;
      this.authServise.getUserById(this.userId).subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
    }
  }
}
