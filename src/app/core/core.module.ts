import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { MainComponent } from './components/main/main.component';
import { MaterialModule } from '../shared/material/material.module';
import { GlobalModule } from '../shared/global/global.module';
import { ContentComponent } from './components/main-nested/content/content.component';
import { MenuComponent } from './components/main-nested/menu/menu.component';
import { StoreModule } from '../shared/store/store.module';
import { LoginComponent } from './components/login/login.component';
import { CanActivateCoreGuard } from './services/can-activate.guard';


@NgModule({
  declarations: [CoreComponent, MainComponent, ContentComponent, MenuComponent, LoginComponent],
  exports: [
    CoreComponent
  ],
  imports: [
    MaterialModule,
    GlobalModule,
    CommonModule,
    CoreRoutingModule,
    StoreModule.forRoot()
  ],
  providers:[CanActivateCoreGuard]
})
export class CoreModule { }
