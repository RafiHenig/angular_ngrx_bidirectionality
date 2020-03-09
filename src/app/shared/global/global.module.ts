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
import { NgSubscribeToDirective } from './directives/subscribe-to.directive';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
export const HttpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

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
  ]

})
export class GlobalModule { 
  // constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
  //   matIconRegistry.addSvgIcon('user', domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/user.svg'));
  //   matIconRegistry.addSvgIcon('language', domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/language.svg'));
  // }
}
