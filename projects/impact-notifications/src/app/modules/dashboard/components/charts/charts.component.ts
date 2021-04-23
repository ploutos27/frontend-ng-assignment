import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from '../../../shared/interfaces/user.interface';
import { DashboardService } from '../../services/dashboard.service';

interface IRes {
  send: number;
  received: number;
}

interface IChart {
  name: string;
  value: number;
}

@Component({
  selector: 'app-root-dashboard-charts',
  templateUrl: './charts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent implements OnInit {
  @Input() user: IUser;
  single: IChart[] = [
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
  view: any[];
  colorScheme = {
    domain: ['#5AA454', '#C7B42C'],
  };

  constructor(
    private readonly service: DashboardService,
    private readonly translate: TranslateService
  ) {
    this.view = [this.initialScreenSize(), 400];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.view = [this.initialScreenSize(), 400];
  }

  ngOnInit(): void {
    this.service
      .receivedSendMessages(this.user.userDetails.email)
      .subscribe((res: IRes) => {
        this.single[1].value = res.send;
        this.single[0].value = res.received;
      });

    this.translate.onLangChange.subscribe((res) => {
      this.yAxisLabel = res.translations.dashboard.charts_messages;
      this.xAxisLabel = res.translations.dashboard.charts_statistics;
      this.single[0].name = res.translations.dashboard.charts_send;
      this.single[1].name = res.translations.dashboard.charts_received;
    });
  }

  private initialScreenSize() {
    const size = window.innerWidth / 3;
    if (window.innerWidth < 600) {
      return size * 2.5;
    }
    if (window.innerWidth < 900) {
      return size * 2;
    }
    if (window.innerWidth >= 960) {
      return size;
    }
  }
}
