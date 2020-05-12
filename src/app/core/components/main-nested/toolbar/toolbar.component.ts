import { Component, OnInit } from '@angular/core';
import { NavTitleService } from '../../../../store/services/nav-title.service';
import { AuthService } from '../../../../store/services/auth.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { rotationClockWise } from '../../../../shared/global/animations/rotation.animation';
import { AppState } from '../../../../store/reducers';
import { Store, select } from '@ngrx/store';
import { LogOutAction } from '../../../../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { User } from '../../../../store/reducers/auth.reducer';
import { getUser } from '../../../../store/selectors/auth.selectors';
import { getShowSideNav, getSideNavExpanded, getSmall, getMediumOrLarger } from '../../../../store/selectors/layout.selectors';
import { ToggleSideNavWidthAction, ToggleSideNavAction } from '../../../../store/actions/layout.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [rotationClockWise(180)]
})
export class ToolbarComponent implements OnInit {
  public user$: Observable<User>;
  public show$: Observable<boolean>;
  public expanded$: Observable<boolean>;
  public small$: Observable<boolean>;
  public mediumOrLarger$: Observable<boolean>;

  constructor(
    public navTitleService: NavTitleService,
    public translate: TranslateService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(getUser));
    this.show$ = this.store.pipe(select(getShowSideNav));
    this.expanded$ = this.store.pipe(select(getSideNavExpanded));
    this.small$ = this.store.pipe(select(getSmall));
    this.mediumOrLarger$ = this.store.pipe(select(getMediumOrLarger));
  }

  public readonly logout = () => this.store.dispatch(new LogOutAction());
  public readonly toggleWidth = () => this.store.dispatch(new ToggleSideNavWidthAction());
  public readonly toggle = () => this.store.dispatch(new ToggleSideNavAction());
}
