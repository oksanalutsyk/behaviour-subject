import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  myForm: FormGroup;
  value: string = '';

  constructor(private fb: FormBuilder, private postServise: PostsService) {}

  ngOnInit() {
    // this.myForm = this.fb.group({
    //   search: [''],
    // });
    // this.showData(this.value);
  }

  onSubmit() {
    // console.log(this.myForm.value);
    // this.value = this.myForm.value.search;
    // this.showData(this.value);
    // this.myForm.reset();
  }

  // showData(query) {
  //   this.postServise.search(query).subscribe((data) => {
  //     console.log(data);
  // // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //     this.postServise.changeQueryParameter(data);
  // // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   });
  // }
}
