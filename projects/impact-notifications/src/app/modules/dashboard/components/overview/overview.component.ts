import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'root-dashboard-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  get user() {
    return this.route.snapshot.data.user;
  }
  constructor(
    private readonly service: DashboardService,
    private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
   // this.service.totalMessageReceived(this.user.userDetails.email).subscribe(res => console.log(res))
  }
}


