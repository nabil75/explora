import { ModaliteSimpleComponent } from './../modalites/modalite-simple/modalite-simple/modalite-simple.component';
import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  [x: string]: any;
  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}


  createComponent<T>(componentType: Type<T>, viewContainerRef: ViewContainerRef): ComponentRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const componentRef = viewContainerRef.createComponent(componentFactory);
    return componentRef;
  }

}
