import { Component } from '@angular/core';
import { LayoutService } from '../../../shared/global/services/layout.service';
import { SideNavService } from '../../../shared/global/services/sidenav.service';
import { shrinkExtendContent } from '../../animations/shrink-extend-content.animation';
import { shrinkExtendMenu } from '../../animations/shrink-extend-menu.animation';
import { NavTitleService } from '../../../shared/global/services/nav-title.service';
import { rotation } from '../../../shared/global/animations/rotation.animation';
import { UserStore } from '../../../shared/store/stores/models/user.store';
import { AuthService } from '../../../shared/global/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    shrinkExtendContent,
    shrinkExtendMenu,
    rotation(180)
  ]
})
export class MainComponent {
  public iconText: string;

  constructor(
    public layoutService: LayoutService,
    public sideNavService: SideNavService,
    public navTitleService: NavTitleService,
    public userStore: UserStore,
    public authService: AuthService,
    private translate: TranslateService
  ) { }

  changeLanugage = (x: string) => this.translate.use(x)
}
