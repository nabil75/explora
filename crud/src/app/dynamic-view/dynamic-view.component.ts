import { Component, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dynamic-view',
  standalone: true,
  template: `
    <ng-template #dynamicTemplate>
      <!-- Your dynamic content here -->
    </ng-template>
    <button (click)="createDynamicView()">Create Dynamic View</button>
  `,
})
export class DynamicViewComponent {
  @ViewChild('dynamicTemplate', { read: TemplateRef }) dynamicTemplate!: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) { }

  createDynamicView() {
    // this.dynamicTemplate = `<app-modalite-simple></app-modalite-simple>`
    this.viewContainerRef.clear(); // Clear any previous dynamic content
    this.viewContainerRef.createEmbeddedView(this.dynamicTemplate);
  }
}
