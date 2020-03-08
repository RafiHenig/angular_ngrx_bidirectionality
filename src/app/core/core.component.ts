import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { stepper } from '../shared/global/animations/stepper.route.animation';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  animations: [stepper]
})
export class CoreComponent {
  constructor() { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animate'];
  }
}
