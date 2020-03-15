import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { map, delay } from 'rxjs/operators';
import { Directionality, Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService, private directionality: Directionality) {
    translate.use('he');
  }

  ngOnInit(): void {
    this.translate.onLangChange.pipe(
      map((x: LangChangeEvent) => x.translations.dir))
      .subscribe((x: Direction) => {
        this.dir = x;
        (this.directionality as any).value = x;
        this.directionality.change.emit();
      })
  }

  @HostBinding("dir") dir: Direction = this.translate.currentLang as Direction;
}
