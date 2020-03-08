import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class LayoutService {
  private isSmallSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isSmall$: Observable<boolean> = this.isSmallSource.asObservable();
  get isSmall(): boolean { return this.isSmallSource.getValue(); }

  constructor(
    breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ])
      .pipe(pluck('matches'))
      .subscribe(this.isSmallSource);
  }

  public readonly dialogConfigFactory = <T>(config: MatDialogConfig<T>, sizeClass?: ('big-dialog' | 'medium-dialog')): MatDialogConfig<T> => ({ panelClass: this.isSmall ? 'mobile-dialog' : sizeClass, ...config });
}
