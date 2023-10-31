import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from 'src/app/services/utils.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-fermee-simple',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-fermee-simple.component.html',
  styleUrls: ['./edit-fermee-simple.component.css']
})
export class EditFermeeSimpleComponent {

  componentId: any;
  libelleQuestion = "";
  modalites: any;
  content: string = "";

  constructor(private utilsService: UtilsService,){
    this.componentId = this.utilsService.generateUniqueId();
  }

  onClickInput(event: any){
    this.content="";
    let id=(event.target.id).split("_");
    this.content = id[1];
  }
}
