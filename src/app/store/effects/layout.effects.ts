import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { BreakpointChangeAction } from '../actions/layout.actions';



@Injectable()
export class LayoutEffects {

  @Effect()
  breakpoint = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map(result => new BreakpointChangeAction({
        mediumOrLarger: !result.matches,
        small: result.matches
      }))
    );

    constructor(
      private breakpointObserver: BreakpointObserver,
      private actions$: Actions,
    ) { }
}
