import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { PostInterface } from 'src/app/shared/interfaces/post.interface';

@Component({
  selector: 'app-success-add',
  templateUrl: './success-add.component.html',
  styleUrls: ['./success-add.component.scss'],
})
export class SuccessAddComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit(): void {}
}
