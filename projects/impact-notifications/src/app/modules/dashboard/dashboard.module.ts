import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
        path: '',
        component: OverviewComponent,
        data: { 
          group: 'general',
          item: 'dashboard' // later for breadcrumb
        }
      }]
  },
];

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class DashboardModule { }
