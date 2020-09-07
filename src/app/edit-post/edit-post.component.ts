import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PostsService } from '../shared/services/posts.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SuccessAddComponent } from '../snack-bar/success-add/success-add.component';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  action = 'edited';

  checked = false;

  imageSrc: string;

  constructor(
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postService.getPostById(this.data.id).subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SuccessAddComponent, {
      duration: this.durationInSeconds * 1000,
      data: { data: this.data, message: this.action, checked: this.checked },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onFileChanged(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.data.image = this.imageSrc;
      };
    }
  }
}
