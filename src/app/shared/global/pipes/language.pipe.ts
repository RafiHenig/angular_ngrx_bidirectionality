import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../vms';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {
  constructor(private translate: TranslateService) { }

  transform(value: string): Observable<Language> {
    return value ? this.translate.get('languages').pipe(map((x: Language[]) => x.find(y => y.code == value))) : null;
  }
}
