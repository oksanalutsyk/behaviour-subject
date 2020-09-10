import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-add',
  templateUrl: './success-add.component.html',
  styleUrls: ['./success-add.component.scss'],
})
export class SuccessAddComponent {
  
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<any>
  ) {}
}
