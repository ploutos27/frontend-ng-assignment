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
import { InboxService } from './services/inbox.service';
import { InboxResolverService } from './services/inbox.resolver';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        resolve: {
          inbox: InboxResolverService,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [OverviewComponent, InboxComponent, SentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTabsModule,
    TranslateModule,
  ],
  providers: [InboxService, InboxResolverService],
})
export class InboxModule {}
