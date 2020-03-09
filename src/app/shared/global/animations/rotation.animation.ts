


import { state, transition, style, animate, trigger, AnimationTriggerMetadata, query } from '@angular/animations';


export function rotationClockWise(x: number): AnimationTriggerMetadata {

    return trigger('rotationClockWise', [
        state('close', style({ transform: 'none' })),
        state('open', style({ transform: `rotate(${x}deg)` })),

        transition('close => open', animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
        transition('open => close', animate('200ms ease-out'))

    ]);
}

export function rotationCounterClockWise(x: number): AnimationTriggerMetadata {

    return trigger('rotationCounterClockWise', [
        state('close', style({ transform: 'none' })),
        state('open', style({ transform: `rotate(${x * -1}deg)` })),

        transition('close => open', animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
        transition('open => close', animate('200ms ease-out'))

    ]);
}



// transition(
//     (fromState, toState) => {
//         return fromState == "close" && toState == "open";
//     },
//     [
//         style({ transform: `rotate(${x}deg)` }),
//         animate("100ms ease-in")
//     ]
// )

