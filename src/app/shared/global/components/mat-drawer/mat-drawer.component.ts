import { Component, OnInit, OnDestroy } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mat-drawer',
  templateUrl: './mat-drawer.component.html',
  styleUrls: ['./mat-drawer.component.scss']
})
export class MatDrawerComponent implements OnDestroy {

  private isRtl: boolean;

  /** Subscription to the Directionality change EventEmitter. */
  private _dirChangeSubscription = Subscription.EMPTY;  

  constructor(dir: Directionality) {
    this.isRtl = dir.value === 'rtl';

    this._dirChangeSubscription = dir.change.subscribe(() => {
      console.log();
    });
  }

  ngOnDestroy() {
    this._dirChangeSubscription.unsubscribe();
  }
}
