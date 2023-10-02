import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}


  createComponent<T>(componentType: Type<T>, viewContainerRef: ViewContainerRef): ComponentRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const componentRef = viewContainerRef.createComponent(componentFactory);
    return componentRef;
  }

}
