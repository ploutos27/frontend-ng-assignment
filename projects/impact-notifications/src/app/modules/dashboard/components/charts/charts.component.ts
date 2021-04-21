import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from '../../../shared/interfaces/user.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'root-dashboard-charts',
  templateUrl: './charts.component.html',
})
export class ChartsComponent implements OnInit {
  @Input() user: IUser;

  // charts
  single: any[] = [
    {
      name: this.translate.instant('dashboard.charts_send'),
      value: 0,
    },
    {
      name: this.translate.instant('dashboard.charts_received'),
      value: 0,
    },
  ];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = this.translate.instant('dashboard.charts_statistics');
  showYAxisLabel = true;
  yAxisLabel = this.translate.instant('dashboard.charts_messages');
  view: any[] = [600, 400];

  colorScheme = {
    domain: ['#5AA454', '#C7B42C'],
  };

  constructor(
    private readonly service: DashboardService,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    
    this.translate.onLangChange.subscribe(res => {
      this.yAxisLabel = res.translations.dashboard.charts_messages;
      this.xAxisLabel = res.translations.dashboard.charts_statistics;
    });

    this.service
      .receivedSendMessages(this.user.userDetails.email)
      .subscribe((res: { send: number; received: number }) => {
        this.single[0].value = res.send;
        this.single[1].value = res.received;
      });
  }
}
