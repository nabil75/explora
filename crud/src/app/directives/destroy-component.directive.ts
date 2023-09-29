import { ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[destroyComponent]'
})
export class DestroyComponentDirective {

  @Input('destroyComponent') componentInstance: any;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnDestroy(): void {
    if (this.componentInstance) {
      this.componentInstance.destroy();
    }
  }

}
