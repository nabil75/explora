import { Component, ComponentFactoryResolver } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-modalite-nc',
    templateUrl: './modalite-nc.component.html',
    styleUrls: ['./modalite-nc.component.css'],
    standalone: true,
    imports: [CdkDrag]
})
export class ModaliteNcComponent {

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
