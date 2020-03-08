import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

export class ObservablesContext {
  $implicit: any;
  ngSubscribeTo: any;
}

@Directive({
  selector: '[ngSubscribeTo]'
})
export class NgSubscribeToDirective implements OnInit {

  private _context = new ObservablesContext();

  @Input()
  set ngSubscribeTo(value: any) {
    this._context.$implicit = this._context.ngSubscribeTo = value;
  }

  constructor
    (
      private template: TemplateRef<ObservablesContext>,
      private viewContainer: ViewContainerRef
    ) { }

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.template, this._context);
  }
}