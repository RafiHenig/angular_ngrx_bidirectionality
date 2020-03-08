import { state, transition, style, animate, trigger } from '@angular/animations';

export const fade = trigger('fade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('800ms', style({ opacity: 0 }))
    ])
]);
