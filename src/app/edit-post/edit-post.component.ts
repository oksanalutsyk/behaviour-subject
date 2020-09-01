import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PostsService } from '../shared/services/posts.service';
import { PostInterface } from '../shared/interfaces/post.interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostInterface,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.postService.getPostById(this.data.id).subscribe((data) => {
      console.log(data);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
