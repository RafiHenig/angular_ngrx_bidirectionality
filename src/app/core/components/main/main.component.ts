import { Component } from '@angular/core';
import { LayoutService } from '../../../shared/global/services/layout.service';
import { SideNavService } from '../../../shared/global/services/sidenav.service';
import { shrinkExtendContentLTR,shrinkExtendContentRTL } from '../../animations/shrink-extend-content.animation';
import { shrinkExtendMenu } from '../../animations/shrink-extend-menu.animation';
import { Directionality } from '@angular/cdk/bidi';

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
export class MainComponent {
  constructor(
    public layoutService: LayoutService,
     public sideNavService: SideNavService,
     public directionality : Directionality
    ) { }
}
