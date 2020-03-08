import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { CanActivateCoreGuard } from './services/can-activate.guard';


const routes: Routes = [
  {
    path: 'core', component: MainComponent, resolve: [], data: { animate: 'isEnd' }, canActivate: [CanActivateCoreGuard], children: []
  },
  {
    path: 'login', component: LoginComponent, data: { animate: 'isStart' }
  },
  { path: '**', redirectTo: 'core' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
