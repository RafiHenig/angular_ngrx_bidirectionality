import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../shared/global/services/auth.service';
import { AppStore } from '../../shared/store/stores/app-store';

@Injectable()
export class CanActivateCoreGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly appStore: AppStore,
        private readonly router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.authService.isLoggedIn().pipe(
            map((x: boolean) => {
                if (x) return true;
                else throwError('Not logged');
            }),
            catchError(() => {
                this.appStore.redirectTo = state.url;
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
