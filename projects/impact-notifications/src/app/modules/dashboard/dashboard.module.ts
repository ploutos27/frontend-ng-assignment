import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent, FrequentUsersComponent, LatestMessagesComponent, ChartsComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedService } from '../shared/services/shared.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from './services/dashboard.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [
    OverviewComponent,
    LatestMessagesComponent,
    FrequentUsersComponent,
    ChartsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule,
    NgxChartsModule,
    RouterModule.forChild(routes),
  ],
  providers: [SharedService, DashboardService],
})
export class DashboardModule {}
