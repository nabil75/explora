import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAdQuestion]'
})
export class AdQuestionDirective {

  constructor( public viewContainerRef: ViewContainerRef ) { }

}
