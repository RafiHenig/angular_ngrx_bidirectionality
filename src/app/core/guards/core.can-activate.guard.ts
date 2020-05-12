import { Injectable, forwardRef } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../store/services/auth.service';
import { Store } from '@ngrx/store';
import { XhrService } from '../../store/services/xhr.service';
import { AppState } from '../../store/reducers';
import { RedirectToAction } from '../../store/actions/auth.actions';
import { CoreModule } from '../core.module';

@Injectable()
export class CoreCanActivateGuard implements CanActivate {

  constructor(
    private readonly xhrService: XhrService,
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.xhrService
      .logGet()
      .pipe(
        catchError(() => {
          this.store.dispatch(new RedirectToAction(state.url))
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}
