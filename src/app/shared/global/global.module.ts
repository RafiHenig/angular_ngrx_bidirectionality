import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { SideNavService } from './services/sidenav.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutService } from './services/layout.service';
import { NavTitleService } from './services/nav-title.service';
import { AuthService } from './services/auth.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BidiModule } from '@angular/cdk/bidi';

import { InjectionToken } from '@angular/core';
import { Dir } from './enums/dir.enum';
import { NgSubscribeToDirective } from './directives/subscribe-to.directive';

export const HttpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');
export const dir: Dir = ($localize`ltr` == 'ltr') ? Dir.LTR : Dir.RTL;
export const APP_DIR = new InjectionToken<Dir>('app.dir');



@NgModule({
  declarations: [NgSubscribeToDirective],
  imports: [
    BidiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'he',
    })
  ],
  exports: [
    TranslateModule,
    NgSubscribeToDirective,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgProgressModule,
    NgProgressHttpModule,
    BidiModule
  ],
  providers: [
    LayoutService,
    SideNavService,
    NavTitleService,
    AuthService,
    {
      provide: APP_DIR,
      useValue: dir
    }
  ]

})
export class GlobalModule { }
