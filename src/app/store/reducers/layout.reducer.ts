import { Action } from '@ngrx/store';
import { LayoutActionTypes } from '../actions/layout.actions';
import { All } from '../actions/layout.actions';

export const layoutFeatureKey = 'layout';

export interface Breakpoint {
  small?: boolean,
  mediumOrLarger?: boolean
}

export interface SideNav {
  showSideNav: boolean,
  sideNavExpanded: boolean;
}

export interface LayoutState {
  breakpoint: Breakpoint,
  sideNav: SideNav,
}

export const initialState: LayoutState = {
  breakpoint: {
    small: false,
    mediumOrLarger: false
  },
  sideNav: {
    showSideNav: true,
    sideNavExpanded: true,
  }
};

export function reducer(state = initialState, action: All): LayoutState {
  switch (action.type)
  {
    case LayoutActionTypes.BreakpointChange: {
      return {
        ...state,
        breakpoint: action.breakPoint
      }
    }

    case LayoutActionTypes.ToggleSideNav: {
      return {
        ...state,
        sideNav: {
          showSideNav: !state.sideNav.showSideNav,
          sideNavExpanded: state.sideNav.sideNavExpanded
        },
      }
    }

    case LayoutActionTypes.ShowSideNav: {
      return {
        ...state,
        sideNav: {
          showSideNav: true,
          sideNavExpanded: state.sideNav.sideNavExpanded
        },
      }
    }

    case LayoutActionTypes.HideSideNav: {
      return {
        ...state,
        sideNav: {
          showSideNav: false,
          sideNavExpanded: state.sideNav.sideNavExpanded
        },
      }
    }

    case LayoutActionTypes.ToggleSideNavWidth: {
      return {
        ...state,
        sideNav:  {
          showSideNav: state.sideNav.showSideNav,
          sideNavExpanded: !state.sideNav.sideNavExpanded
        },
      }
    }

    case LayoutActionTypes.ExpandSideNav: {
      return {
        ...state,
        sideNav:  {
          showSideNav: state.sideNav.showSideNav,
          sideNavExpanded: true
        },
      }
    }

    case LayoutActionTypes.MinimizeSideNav: {
      return {
        ...state,
        sideNav:  {
          showSideNav: state.sideNav.showSideNav,
          sideNavExpanded: false
        },
      }
    }

    default:
      return state;
  }
}
