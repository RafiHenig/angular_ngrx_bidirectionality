import { Component, ViewChild, OnInit } from '@angular/core';
import { shrinkExtendContentLTR, shrinkExtendContentRTL } from '../../animations/shrink-extend-content.animation';
import { shrinkExtendMenu } from '../../animations/shrink-extend-menu.animation';
import { Directionality } from '@angular/cdk/bidi';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { AppState } from '../../../store/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getShowSideNav, getSideNavExpanded, getSmall } from '../../../store/selectors/layout.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    shrinkExtendContentLTR,
    shrinkExtendContentRTL,
    shrinkExtendMenu
  ]
})
export class MainComponent implements OnInit {
  public show$: Observable<boolean>;
  public expanded$: Observable<boolean>;
  public small$: Observable<boolean>;

  constructor(
    public store: Store<AppState>,
    public directionality: Directionality
  ) { }

  ngOnInit(): void {
    this.show$ = this.store.pipe(select(getShowSideNav));
    this.expanded$ = this.store.pipe(select(getSideNavExpanded));
    this.small$ = this.store.pipe(select(getSmall));
  }

}
