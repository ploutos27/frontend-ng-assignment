import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { ApiModule, AuthModule } from '@impactech/common/src/public-api';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    NgxsModule.forRoot([], { developmentMode: !environment.production }), // needs to be init for auth
    AuthModule.forRoot(),
    ApiModule,
    SharedModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
