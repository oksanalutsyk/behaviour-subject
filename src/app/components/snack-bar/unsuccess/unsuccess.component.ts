import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unsuccess',
  templateUrl: './unsuccess.component.html',
  styleUrls: ['./unsuccess.component.scss']
})
export class UnsuccessComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<any>
  ) {}

  ngOnInit(): void {
  }

}
