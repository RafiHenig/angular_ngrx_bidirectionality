import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AppStore {

  constructor() { }

  private readonly redirectToSource = new BehaviorSubject(null);
  private readonly loggedSource = new BehaviorSubject<boolean>(false);

  public readonly logged$: Observable<boolean> = this.loggedSource.asObservable();
  public readonly redirectTo$: Observable<string> = this.redirectToSource.asObservable();

  set logged(x: boolean) { this.loggedSource.next(x) }
  set redirectTo(x: string) { this.redirectToSource.next(x); }

}
