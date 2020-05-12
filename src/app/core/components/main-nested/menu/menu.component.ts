import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { shrinkExtendMenuLink } from '../../../animations/shrink-extend-menu-link.animation';
import { rotationClockWise, rotationCounterClockWise } from '../../../../shared/global/animations/rotation.animation';
import { Page, Directory } from '../../../../shared/global/vms';
import { Directionality } from '@angular/cdk/bidi';
import { revealVertically } from '../../../../shared/global/animations/reveal-rertically.animation';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store'
import { AppState } from '../../../../store/reducers';
import { Subject, timer, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getSideNavExpanded, getSmall } from '../../../../store/selectors/layout.selectors';
import { ToggleSideNavWidthAction, ToggleSideNavAction } from '../../../../store/actions/layout.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    revealVertically,
    shrinkExtendMenuLink,
    rotationClockWise(90),
    rotationCounterClockWise(90)
  ]
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly destory$ = new Subject<void>();
  public showLinkText: boolean = true;
  public small$: Observable<boolean>;
  public opendDir: Directory;

  constructor(
    public directionality: Directionality,
    public translate: TranslateService,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.small$ = this.store.pipe(select(getSmall));

    this.store.pipe(
      takeUntil(this.destory$),
      select(getSideNavExpanded)
    )
      .subscribe(x => x ? timer(0).subscribe(() => this.showLinkText = x) : this.showLinkText = x);
  }

  public toggleWidth = (): void => this.store.dispatch(new ToggleSideNavWidthAction())

  public dissmissSideNavIfSmall = (x: Page): void => {
    this.store.pipe(select(getSmall)).subscribe(y => {
      if (y && x.route) this.store.dispatch(new ToggleSideNavAction())
    })
  };

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.unsubscribe();
  }
}
