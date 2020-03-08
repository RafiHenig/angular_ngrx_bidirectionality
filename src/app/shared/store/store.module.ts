import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XhrService } from './services/xhr.service';
import { UserStore } from './stores/models/user.store';
import { AppStore } from './stores/app-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: [
        AppStore,
        XhrService,
        UserStore,
      ]
    };
  }
}
