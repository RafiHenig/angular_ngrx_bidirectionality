import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { MainComponent } from './components/main/main.component';
import { MaterialModule } from '../shared/material/material.module';
import { GlobalModule } from '../shared/global/global.module';
import { ContentComponent } from './components/main-nested/content/content.component';
import { MenuComponent } from './components/main-nested/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { CoreCanActivateGuard } from './guards/core.can-activate.guard';
import { ToolbarComponent } from './components/main-nested/toolbar/toolbar.component';


@NgModule({
  declarations: [CoreComponent, MainComponent, ContentComponent, MenuComponent, LoginComponent, ToolbarComponent],
  exports: [
    CoreComponent
  ],
  imports: [
    MaterialModule,
    GlobalModule,
    CommonModule,
    CoreRoutingModule,
  ],
  providers:[CoreCanActivateGuard]
})
export class CoreModule { }
