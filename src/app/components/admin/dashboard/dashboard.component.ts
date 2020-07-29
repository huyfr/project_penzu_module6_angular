import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminUserService} from '../../../services/admin/admin-user.service';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reportForm: FormGroup;
  monthChartReportForm: FormGroup;
  monthSelected: number;
  listUserIn2020: [] = [];
  data2020: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  dataMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private formBuilder: FormBuilder,
              private adminUserService: AdminUserService) {
  }

  public barChartOptions1 = {
    scaleShowVerticalLines: false,
    responsive: true,
    scaleShowValues: true,
  };
  public barChartLabels1 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public barChartType1 = 'bar';
  public barChartLegend1 = true;
  public barChartData1 = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];

  public barChartColors1: Color[] = [
    {backgroundColor: 'green'},
  ];

  public barChartOptions2 = {
    scaleShowVerticalLines: false,
    responsive: true,
    scaleShowValues: true,
  };
  public barChartLabels2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  public barChartType2 = 'bar';
  public barChartLegend2 = true;
  public barChartData2 = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];


  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]]
    });

    this.monthChartReportForm = this.formBuilder.group({
      monthSelection: ['']
    });

    const adminReportForm2020 = {
      fromDate: '2020-01-01T00:00:00.000',
      toDate: '2020-12-31T23:59:59.000',
    };
    this.adminUserService.searchByCreateDate(adminReportForm2020).subscribe(
      res => {
        this.listUserIn2020 = res;
        for (let j = 0; j < this.barChartLabels1.length; j++) {
          for (let i = 0; i < res.length; i++) {
            if (this.barChartLabels1[j] == res[i].createDate.toString().slice(5, 7)) {
              this.data2020[j] += 1;
            }
          }
        }

        this.barChartData1 = [
          {data: this.data2020, label: 'User Qty'},
        ];

        console.log(res);
      });

    this.monthChartReportForm.valueChanges.subscribe(res => this.monthSelected = res);
  }

  report(): void {
    this.adminUserService.searchByCreateDate(this.reportForm.value).subscribe(
      res => console.log(res)
    );
  }
}
