


import { state, transition, style, animate, trigger, AnimationTriggerMetadata } from '@angular/animations';


export function rotation(x: number): AnimationTriggerMetadata {

    return trigger('rotation', [
        state('close', style({ transform: 'none' })),
        state('open', style({ transform: `rotate(${x}deg)` })),

        transition('close => open', animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
        transition('open => close', animate('200ms ease-out'))

    ]);
}

export function dirRotation(x: number): AnimationTriggerMetadata {
    return trigger('rotation', [
        state('close', style({ transform: 'none' })),
        state('open', style({ transform: `rotate(${document.dir == 'ltr' ? x: x * -1 }deg)` })),

        transition('close => open', animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
        transition('open => close', animate('200ms ease-out'))

    ]);
}

