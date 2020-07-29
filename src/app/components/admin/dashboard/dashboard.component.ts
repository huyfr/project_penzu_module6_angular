import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reportForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]]
    });
  }

  report(): void {
    console.log(this.reportForm);
  }
}
