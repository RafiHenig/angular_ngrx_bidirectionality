import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { Dir } from './shared/global/enums/dir.enum';
import { APP_DIR } from './shared/global/global.module';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { map, delay } from 'rxjs/operators';
import { LayoutService } from './shared/global/services/layout.service';
import { Directionality, Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService,private directionality: Directionality) {
    translate.setDefaultLang('he');
    translate.use('he');
  }

  ngOnInit(): void {
    this.translate.onLangChange.pipe(
      map((x: LangChangeEvent) => x.translations.dir))
      .subscribe((x: Direction) => {
        this.dir = x;
        (this.directionality as any).value = x;
        this.directionality.change.emit(x)
      })
  }

  @HostBinding("dir") dir: Direction = Dir.LTR;
}
