import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-fermee-multiple',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-fermee-multiple.component.html',
  styleUrls: ['./edit-fermee-multiple.component.css']
})
export class EditFermeeMultipleComponent {

  componentId: any;
  libelleQuestion = "";
  modalites: any ;
  maxReponses: number =0;

  constructor(private utilsService: UtilsService,){
    this.componentId = this.utilsService.generateUniqueId();
  }
}
