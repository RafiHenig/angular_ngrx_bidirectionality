import { state, transition, style, animate, trigger } from '@angular/animations';

export const shrinkExtendMenu = trigger('shrinkExtendMenu', [

    state('close',
        style({
            width: '48px'
        })
    ),
    state('open',
        style({
            width: '300px'
        })
    ),

    transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
]);

