import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reportForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      fromDate : ['', [Validators.required]],
      toDate : ['', [Validators.required]]
    });
  }

  report(): void {
    console.log(this.reportForm);
  }
}
