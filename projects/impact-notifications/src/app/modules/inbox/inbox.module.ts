import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent, InboxComponent, SentComponent } from './components';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

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
  declarations: [OverviewComponent, InboxComponent, SentComponent],
  imports: [
    RouterModule.forChild(routes),
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTabsModule,
    TranslateModule,
  ],
})
export class InboxModule {}
