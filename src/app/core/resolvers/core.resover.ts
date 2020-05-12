import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../store/reducers/auth.reducer';
import { XhrService } from '../../store/services/xhr.service';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { LogInSuccessAction } from '../../store/actions/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class CoreResolve implements Resolve<User> {

  constructor(
    private xhrService: XhrService,
    private store: Store<AppState>
  ) { }

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.xhrService
      .userGet()
      .pipe(
        tap(x => this.store.dispatch(new LogInSuccessAction(x, false)))
      )
  }
}
