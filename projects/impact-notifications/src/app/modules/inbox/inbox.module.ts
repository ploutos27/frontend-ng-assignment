import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent, ReceivedComponent, SentComponent } from './components';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
        path: '',
        component: OverviewComponent
      }]
  },
];

@NgModule({
  declarations: [OverviewComponent, ReceivedComponent, SentComponent],
  imports: [
    RouterModule.forChild(routes),
    MatTableModule,
    MatTabsModule,
    TranslateModule,
  ],
})
export class InboxModule {}
