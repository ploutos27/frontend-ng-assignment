import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root-dashboard-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  get user() {
    return this.route.snapshot.data.user;
  }
  constructor(private readonly route: ActivatedRoute) {}
}


