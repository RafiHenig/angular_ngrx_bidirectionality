import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const selectAuthState = (state: AppState) => state.auth;

export const getErrorMessage = createSelector(selectAuthState, auth => auth.errorMessage)
export const getLoading = createSelector(selectAuthState, auth => auth.isLoading)
export const getRedirectTo = createSelector(selectAuthState, auth => auth.redirectTo)
export const getUser = createSelector(selectAuthState, auth => auth.user);
