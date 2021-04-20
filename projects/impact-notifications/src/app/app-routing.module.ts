import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@impactech/common/src/public-api';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'inbox',
    loadChildren: () => import('./modules').then((m) => m.InboxModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
