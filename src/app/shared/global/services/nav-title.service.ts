import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NavTitleService {
  private titleSource: BehaviorSubject<string> = new BehaviorSubject<string>("OneCard");
  public tilte$: Observable<string> = this.titleSource.asObservable();
  set title(x: string) { this.titleSource.next(x) };
}
