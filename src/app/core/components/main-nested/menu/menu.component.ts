import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../../../../shared/global/services/sidenav.service';
import { LayoutService } from '../../../../shared/global/services/layout.service';
import { first } from 'rxjs/operators';
import { UserStore } from '../../../../shared/store/stores/models/user.store';
import { revealSubPages } from '../../../animations/reveal-sub-page.animation';
import { shrinkExtendMenuLink } from '../../../animations/shrink-extend-menu-link.animation';
import { rotation, dirRotation } from '../../../../shared/global/animations/rotation.animation';
import { Page, Directory } from '../../../../shared/global/vms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    revealSubPages,
    shrinkExtendMenuLink,
    dirRotation(90)
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

  constructor(public sideNavService: SideNavService, public layoutService: LayoutService) { }

  ngOnInit() {
    this.sideNavService.isFullWidth$.subscribe(x => x ? setTimeout(() => this.showLinkText = x, 0) : this.showLinkText = x);
  }

  public toggleWidth = (): void => this.sideNavService.toggleWidth();

  public dissmissSideNavIfSmall = (x: Page): void => {
    if (x.route && this.layoutService.isSmall) this.sideNavService.toggle();
  };

 // public resetSelection = (name: string): void => this.pages.filter(x => x.name !== name).forEach(x => x.opened = false)
}
