import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-modalite-simple',
  templateUrl: './modalite-simple.component.html',
  styleUrls: ['./modalite-simple.component.css']
})
export class ModaliteSimpleComponent implements OnInit {

  componentId: any;
  value!: string;
  libelleModalite!: string;


  constructor(private eventEmitterService: EventEmitterService,
    private utilsService: UtilsService
    ){
    this.componentId = this.utilsService.generateUniqueId();
  }

  ngOnInit(){

  }

  remove_modalite(id: number){
    this.eventEmitterService.onFirstComponentModaliteClick(id);
  }

  modify_branchement_content_after_modalite_change(componentId: number, value: string){

  }

  modalite_value_before_change(value: string){

  }
}

