import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@impactech/common/src/public-api';
import { SharedResolverService } from './modules/shared/services/shared.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
    resolve: {
      user: SharedResolverService,
    },
  },
  {
    path: 'inbox',
    loadChildren: () => import('./modules').then((m) => m.InboxModule),
    canActivate: [AuthGuard],
    resolve: {
      user: SharedResolverService,
    },
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
    resolve: {
      user: SharedResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
