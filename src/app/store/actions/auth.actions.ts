import { Action } from '@ngrx/store';
import { User } from '../reducers/auth.reducer';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  INPUT_CHANGE = '[Auth]  Input Change',
  RDIRECT_TO = '[Auth]  RedirectTo Change',
  LOGOUT = '[Auth] Logout',
}

export class LogInAction implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public user: User) { }
}

export class LogInSuccessAction implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public user: User, public redirection: boolean) { }
}

export class LogInFailureAction implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public errorMessage: string) { }
}

export class InputChangeAction implements Action {
  readonly type = AuthActionTypes.INPUT_CHANGE;
}

export class LogOutAction implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class RedirectToAction implements Action {
  readonly type = AuthActionTypes.RDIRECT_TO;
  constructor(public redirectTo: string) { }
}

export type All =
  | LogInAction
  | LogInSuccessAction
  | LogInFailureAction
  | LogOutAction
  | InputChangeAction
  | RedirectToAction;
