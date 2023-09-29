import { Component, ComponentFactoryResolver } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-modalite-autre',
  templateUrl: './modalite-autre.component.html',
  styleUrls: ['./modalite-autre.component.css']
})
export class ModaliteAutreComponent {

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
