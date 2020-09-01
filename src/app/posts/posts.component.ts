import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostsService } from '../shared/services/posts.service';
import { Subscription } from 'rxjs';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  posts: any;
  title: string;
  body: string;


  private subscription: Subscription;

  constructor(private postServise: PostsService, public dialog: MatDialog) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.getQuery();
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  getQuery() {
    const postsStream$ = this.postServise.query$.subscribe(
      (item) => ((this.posts = item), console.log(item)),
      (err) => console.log(err)
    );
    console.log(this.posts);
    this.subscription.add(postsStream$);
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  deletePost(id) {
    const postsStream$ = this.postServise.deletePost(id).subscribe((data) => {
      console.log(data);
    });
    this.subscription.add(postsStream$);
    this.getPosts();
  }

  getPosts() {
    const postsStream$ = this.postServise.getPosts().subscribe((data) => {
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.postServise.changeQueryParameter(data);
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
    this.subscription.add(postsStream$);
  }

  openDialog(post) {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '1000px',
      data: { title: post.title, body: post.body, id:post._id  },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const postsStream$ = this.postServise
        .updatePost(post._id, result)
        .subscribe((data) => {
          console.log('update', data);
          this.getPosts();
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
