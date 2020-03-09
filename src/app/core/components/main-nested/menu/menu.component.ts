import { Component, OnInit, HostBinding } from '@angular/core';
import { SideNavService } from '../../../../shared/global/services/sidenav.service';
import { LayoutService } from '../../../../shared/global/services/layout.service';
import { shrinkExtendMenuLink } from '../../../animations/shrink-extend-menu-link.animation';
import { rotationClockWise,rotationCounterClockWise} from '../../../../shared/global/animations/rotation.animation';
import { Page, Directory } from '../../../../shared/global/vms';
import { revealVertically } from '../../../animations/reveal-rertically.animation';
import { Directionality } from '@angular/cdk/bidi';

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

  public directories: Directory[] = [
    {
      title: 'כרטיס אחד', icon: 'help',
      pages:
        [
          { title: 'כרטיס אחד', route: './', icon: 'help' },
          { title: 'כרטיס אחד', route: './', icon: 'help' },
        ]
    },
    {
      title: 'כרטיס אחד', icon: 'help',
      pages:
        [
          { title: 'כרטיס אחד', route: './', icon: 'help' },
          { title: 'כרטיס אחד', route: './', icon: 'help' },
        ]
    },
    {
      title: 'כרטיס אחד', icon: 'help',
      pages:
        [
          { title: 'כרטיס אחד', route: './', icon: 'help' },
          { title: 'כרטיס אחד', route: './', icon: 'help' },
        ]
    },
    {
      title: 'כרטיס אחד', icon: 'help',
      pages:
        [
          { title: 'כרטיס אחד', route: './', icon: 'help' },
          { title: 'כרטיס אחד', route: './', icon: 'help' },
        ]
    },
  ];

  constructor(public sideNavService: SideNavService, public layoutService: LayoutService, public directionality : Directionality) { }

  ngOnInit() {
    this.sideNavService.isFullWidth$.subscribe(x => x ? setTimeout(() => this.showLinkText = x, 0) : this.showLinkText = x);
    this.directionality.value
  }

  public toggleWidth = (): void => this.sideNavService.toggleWidth();

  public dissmissSideNavIfSmall = (x: Page): void => {
    if (x.route && this.layoutService.isSmall) this.sideNavService.toggle();
  };

  // public resetSelection = (name: string): void => this.pages.filter(x => x.name !== name).forEach(x => x.opened = false)
}
