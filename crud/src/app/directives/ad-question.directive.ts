import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appAdQuestion]',
    standalone: true
})
export class AdQuestionDirective {

  constructor( public viewContainerRef: ViewContainerRef ) { }

}
