import { state, transition, style, animate, trigger } from '@angular/animations';


export const shrinkExtendMenuLink = trigger('shrinkExtendMenuLink', [
  state('hide',
    style({
      flex: "none",
      padding: 0,
      width: 0,
      fontSize: 0,
      opacity: 0
    })
  ),
  state('show',
    style({
      flex: "*",
      padding: "*",
      width: '*',
      fontSize: "*",
      opacity: 1
    })
  ),

  transition('* => show', animate('120ms ease-in')),
]);
