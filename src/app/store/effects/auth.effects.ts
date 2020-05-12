import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {  LogInSuccessAction, LogInFailureAction, AuthActionTypes, RedirectToAction, LogInAction } from '../actions/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap, catchError, tap, withLatestFrom, switchMapTo } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { XhrService } from '../services/xhr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { getRedirectTo } from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {

  LogIn$ = createEffect(() => this.actions$
    .pipe(
      ofType<LogInAction>(AuthActionTypes.LOGIN),
      switchMap(payload => {
        return this.xhrService.logPost(payload.user)
          .pipe(
            mergeMap(() => this.xhrService.userGet()),
            map(user => new LogInSuccessAction(user, true)),
            catchError((error: HttpErrorResponse) => {
              return of(new LogInFailureAction(error.message));
            })
          )
      })
    ));

  LoginSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType<LogInSuccessAction>(AuthActionTypes.LOGIN_SUCCESS),
      withLatestFrom(this.store.pipe(select(getRedirectTo))),
      tap(([action, redirectTo]) => {
        if(action.redirection) this.router.navigateByUrl(redirectTo || '/')
      })
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private xhrService: XhrService,
    private router: Router
  ) { }

}
