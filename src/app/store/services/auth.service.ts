import { Injectable } from '@angular/core';
import { Observable, throwError, iif, of } from 'rxjs';
import { XhrService } from './xhr.service';
import { tap, mergeMap, mergeMapTo, first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly xhrService: XhrService,
  ) { }

  // public logIn = (x: User): Observable<void> => this.xhrService.logPost(x);
  // public logOut = () => this.xhrService.logDelete();



  // public isLoggedIn = (): Observable<boolean> => this.appStore.logged$
  //   .pipe(
  //     first(),
  //     mergeMap(x => x ? of(true) : this.xhrService.logGet()),
  //     tap(x => {
  //       if (!x) return;
  //       this.appStore.logged = true;
  //       this.userStore.load();
  //     })
  //   )

}
