import { Injectable } from '@angular/core';
import { LayoutService } from './layout.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SideNavService {
  constructor(private layoutService: LayoutService) {
    let previousSetting: boolean = true;
    let previousCheck: boolean; // guard intended to prevent duplicate value assignment (breakpoints-change events are executed multiple times)

    this.layoutService.isSmall$.subscribe(isSmall => {
      if(isSmall && isSmall != previousCheck) previousSetting = this.isOpenSource.getValue();
      if(isSmall) this.toggleWidth(true);
      
      this.toggle(isSmall ? false : previousSetting);
      previousCheck = isSmall;
    });
  }

  private isOpenSource: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private isFullWidthSouce: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public isOpen$: Observable<boolean> = this.isOpenSource.asObservable();
  public isFullWidth$: Observable<boolean> = this.isFullWidthSouce.asObservable();

  public toggle = (v: boolean = !this.isOpenSource.getValue()) => this.isOpenSource.next(v);
  public toggleWidth = (v: boolean = !this.isFullWidthSouce.getValue()) => this.isFullWidthSouce.next(v);
}
