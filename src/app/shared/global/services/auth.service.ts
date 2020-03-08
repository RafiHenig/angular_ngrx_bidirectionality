import { Injectable } from '@angular/core';
import { User } from '../../store/dto/user.dto.user';
import { Observable, throwError, iif, of } from 'rxjs';
import { XhrService } from '../../store/services/xhr.service';
import { tap, mergeMap, mergeMapTo, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserStore } from '../../store/stores/models/user.store';
import { AppStore } from '../../store/stores/app-store';

@Injectable()
export class AuthService {

  constructor(
    private readonly xhrService: XhrService,
    private readonly appStore: AppStore,
    private readonly userStore: UserStore,
    private router: Router,
  ) { }

  public logIn = (x: User): Observable<string> => this.xhrService.logPost(x)
    .pipe(
      mergeMapTo(this.appStore.redirectTo$.pipe(first())),
      tap(x => {
        this.router.navigate([x || '/']);
        this.appStore.redirectTo = null;
        this.appStore.logged = true;
      })
    )

  public isLoggedIn = (): Observable<boolean> => this.appStore.logged$
    .pipe(
      first(),
      mergeMap(x => x ? of(true) : this.xhrService.logGet()),
      tap(x => {
        if (!x) return;
        this.appStore.logged = true;
        this.userStore.load();
      })
    )

  public logOut = () => this.xhrService.logDelete().subscribe(() => {
    this.appStore.logged = false;
    this.router.navigate(['/login']);
  });

}
