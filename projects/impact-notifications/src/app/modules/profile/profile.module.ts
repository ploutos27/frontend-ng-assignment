import { NgModule } from '@angular/core';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import {
  DetailsComponent,
  OverviewComponent,
  SecurityComponent,
} from './components';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { fieldMatchValidator } from './functions/field-match-validator';
import { ProfileService } from './services/profile.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '@impactech/common/src/public-api';
import { ProfileResolverService } from './services/profile.resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        resolve: {
          user: ProfileResolverService,
        },
      },
    ],
  },
];

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'legacy',
};

@NgModule({
  declarations: [OverviewComponent, DetailsComponent, SecurityComponent],
  imports: [
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    TranslationModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'fieldMatch',
          validation: fieldMatchValidator,
        },
      ],
    }),
    FormlyMaterialModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ProfileService,
    ProfileResolverService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
  ],
})
export class ProfileModule {}
