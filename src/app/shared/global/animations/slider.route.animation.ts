import { trigger, transition, query, style, group, animate, keyframes, animateChild } from '@angular/animations';

export const slider =
    trigger('slider', [
        transition('* => isEnd', slideTo(document.dir == "ltr" ? 'right' : 'left')),
        transition('* => isStart', slideTo(document.dir == "ltr" ? 'left' : 'right')),
        transition('isEnd => *', slideTo(document.dir == "ltr" ? 'left' : 'right')),
        transition('isStart => *', slideTo(document.dir == "ltr" ? 'right' : 'left'))
    ]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('600ms ease', style({ [direction]: '0%' }))
            ])
        ]),
        // Normalize the page style... Might not be necessary

        // Required only if you have child animations on the page
        // query(':leave', animateChild()),
        // query(':enter', animateChild()),
    ];
}

