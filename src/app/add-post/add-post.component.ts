import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PostsService } from '../shared/services/posts.service';
import { PostInterface } from '../shared/interfaces/post.interface';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostInterface,
    private postService: PostsService
  ) {}


  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
