import { trigger, transition, animate, style, state, AnimationTriggerMetadata } from '@angular/animations';

export const shrinkExtendContentRTL = trigger('shrinkExtendContentRTL', [
  state('closed',
    style({
      'margin-right': '0',
    })
  ),
  state('opened',
    style({
      'margin-right': '48px'
    })
  ),
  state('extended',
    style({
      'margin-right': '300px'
    })
  ),
  transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
]);

export const shrinkExtendContentLTR = trigger('shrinkExtendContentLTR', [
  state('closed',
    style({
      'margin-left': '0',
    })
  ),
  state('opened',
    style({
      'margin-left': '48px'
    })
  ),
  state('extended',
    style({
      'margin-left': '300px'
    })
  ),
  transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
]);


// export const shrinkExtendContent = trigger('shrinkExtendContent', [
//   state('closed',
//     style({
//       'margin': '0',
//       'margin-inline-start': '0'
//     })
//   ),
//   state('opened',
//     style({
//       'margin': '0',
//       'margin-inline-start': '48px'
//     })
//   ),
//   state('extended',
//     style({
//       'margin': '0',
//       'margin-inline-start': '300px'
//     })
//   ),
//   transition('*  <=> *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
// ]);


