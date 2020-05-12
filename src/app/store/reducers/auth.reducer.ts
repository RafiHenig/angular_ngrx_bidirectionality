import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { All, AuthActionTypes } from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface User {
  username: string;
  email: string;
  id?: number;
}

export interface Auth {
  redirectTo?: string;
  isLoading?: boolean;
  user?: User,
  isAuthenticated: boolean;
  errorMessage?: string;
}

export interface AuthState extends Auth { }

export const initialState: AuthState = {
  redirectTo: "",
  isAuthenticated: false,
  isLoading: false
};

export function reducer(state = initialState, action: All): AuthState {
  switch (action.type)
  {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: null,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        errorMessage: action.errorMessage
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        errorMessage: null
      };
    }
    case AuthActionTypes.RDIRECT_TO: {
      return {
        ...state,
        redirectTo: action.redirectTo
      };
    }

    default: {
      return state;
    }
  }
}

