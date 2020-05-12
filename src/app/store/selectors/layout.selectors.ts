import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const selectLayoutState = (state: AppState) => state.layout;

export const getSmall = createSelector(selectLayoutState, state => state.breakpoint.small);
export const getMediumOrLarger = createSelector(selectLayoutState, state => state.breakpoint.mediumOrLarger);
export const getShowSideNav = createSelector(selectLayoutState, state => state.sideNav.showSideNav);
export const getSideNavExpanded = createSelector(selectLayoutState, state => state.sideNav.sideNavExpanded);
