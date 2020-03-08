import { state, transition, style, animate, trigger } from '@angular/animations';

export const revealSubPages = trigger('revealSubPages', [
    transition(':enter', [
      style({ height: '0' }),
      animate('200ms ease-out', style({ height: '*' }))
    ]),
    transition(':leave', [
      style({width: '*'}),
      animate('200ms ease-out', style({ height: '0px', width: '*' }))
    ]),
  ]);