import { Component, ComponentFactoryResolver } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-modalite-nsp',
    templateUrl: './modalite-nsp.component.html',
    styleUrls: ['./modalite-nsp.component.css'],
    standalone: true,
    imports: [CdkDrag]
})
export class ModaliteNspComponent {
  componentId: any;
  value!: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private eventEmitterService: EventEmitterService,
    private utilsService: UtilsService ){
    this.componentId = this.utilsService.generateUniqueId();
  }

  remove_modalite(id: number){
    this.eventEmitterService.onFirstComponentModaliteClick(id);
  }
}
