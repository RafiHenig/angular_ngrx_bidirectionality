import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../shared/global/services/layout.service';
import { SideNavService } from '../../../../shared/global/services/sidenav.service';
import { NavTitleService } from '../../../../shared/global/services/nav-title.service';
import { UserStore } from '../../../../shared/store/stores/models/user.store';
import { AuthService } from '../../../../shared/global/services/auth.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { rotationClockWise } from '../../../../shared/global/animations/rotation.animation';
import { Language } from '../../../../shared/global/vms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [rotationClockWise(180)]
})
export class ToolbarComponent {
  constructor(public layoutService: LayoutService,
    public sideNavService: SideNavService,
    public navTitleService: NavTitleService,
    public userStore: UserStore,
    public authService: AuthService,
    public translate: TranslateService
  ) { }
}
