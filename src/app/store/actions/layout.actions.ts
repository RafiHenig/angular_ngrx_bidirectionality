import { Action } from '@ngrx/store';
import { Breakpoint } from '../reducers/layout.reducer';

export enum LayoutActionTypes {
  BreakpointChange = '[Layout] breakpoint Change',
  ToggleSideNav = '[Layout] Toggle SideNav',
  ShowSideNav = '[Layout] Show SideNav',
  HideSideNav = '[Layout] Hide SideNav',
  ToggleSideNavWidth = '[Layout] Toggle SideNav Width',
  ExpandSideNav = '[Layout] Expand SideNav',
  MinimizeSideNav = '[Layout] Minimize SideNav',
}

export class BreakpointChangeAction implements Action {
  readonly type = LayoutActionTypes.BreakpointChange;
  constructor(public breakPoint: Breakpoint) { }
}

export class ToggleSideNavAction implements Action {
  readonly type = LayoutActionTypes.ToggleSideNav;
}

export class ShowSideNavAction implements Action {
  readonly type = LayoutActionTypes.ShowSideNav;
}

export class HideSideNavAction implements Action {
  readonly type = LayoutActionTypes.HideSideNav;
}

export class ToggleSideNavWidthAction implements Action {
  readonly type = LayoutActionTypes.ToggleSideNavWidth;
}

export class ExpandSideNavAction implements Action {
  readonly type = LayoutActionTypes.ExpandSideNav;
}

export class MinimizeSideNavAction implements Action {
  readonly type = LayoutActionTypes.MinimizeSideNav
}

export type All =
  | BreakpointChangeAction
  | ToggleSideNavAction
  | ShowSideNavAction
  | HideSideNavAction
  | ToggleSideNavWidthAction
  | ExpandSideNavAction
  | MinimizeSideNavAction;

