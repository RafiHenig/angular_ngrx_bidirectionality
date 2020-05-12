import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { CoreCanActivateGuard } from './guards/core.can-activate.guard';
import { CoreResolve } from './resolvers/core.resover';


const routes: Routes = [
  {
    path: 'core', component: MainComponent, canActivate: [CoreCanActivateGuard], resolve: [CoreResolve], data: { animate: 'isEnd' }, children: []
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
