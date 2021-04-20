import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components';
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
  declarations: [OverviewComponent],
  imports: [
    TranslateModule,
    RouterModule.forChild(routes)
  ]
})

export class DashboardModule { }
