import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromLayout from './layout.reducer';


export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromLayout.layoutFeatureKey]: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromLayout.layoutFeatureKey]: fromLayout.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
