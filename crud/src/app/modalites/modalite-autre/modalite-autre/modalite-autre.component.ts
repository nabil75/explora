import { Component, ComponentRef } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-modalite-autre',
    templateUrl: './modalite-autre.component.html',
    styleUrls: ['./modalite-autre.component.css'],
    standalone: true,
    imports: [CdkDrag]
})
export class ModaliteAutreComponent {

  componentId: any;
 
  value!: string;

  constructor(private eventEmitterService: EventEmitterService,
    private componentRef: ComponentRef<ModaliteAutreComponent>,
    private utilsService: UtilsService ){
    this.componentId = this.utilsService.generateUniqueId();
  }

  remove_modalite(id: number){
    this.eventEmitterService.onFirstComponentModaliteClick(id);
  }

}
