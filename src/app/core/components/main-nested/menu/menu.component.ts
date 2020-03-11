import { Component, OnInit, HostBinding } from '@angular/core';
import { SideNavService } from '../../../../shared/global/services/sidenav.service';
import { LayoutService } from '../../../../shared/global/services/layout.service';
import { shrinkExtendMenuLink } from '../../../animations/shrink-extend-menu-link.animation';
import { rotationClockWise, rotationCounterClockWise } from '../../../../shared/global/animations/rotation.animation';
import { Page, Directory } from '../../../../shared/global/vms';
import { Directionality } from '@angular/cdk/bidi';
import { revealVertically } from '../../../../shared/global/animations/reveal-rertically.animation';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

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
export class MenuComponent implements OnInit {
  public showLinkText: boolean = true;
  public opendDir: Directory;

  constructor(
    public sideNavService: SideNavService,
    public layoutService: LayoutService,
    public directionality: Directionality,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.sideNavService.isFullWidth$.subscribe(x => x ? setTimeout(() => this.showLinkText = x, 0) : this.showLinkText = x);
  }

  public toggleWidth = (): void => this.sideNavService.toggleWidth();

  public dissmissSideNavIfSmall = (x: Page): void => {
    if (x.route && this.layoutService.isSmall) this.sideNavService.toggle();
  };
}
