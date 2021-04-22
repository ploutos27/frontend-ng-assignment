import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-root-profile-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  get user(): IUser {
    return this.route.snapshot.data.user;
  }
  constructor(private readonly route: ActivatedRoute) {}
}


