import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-echelle',
  standalone: true,
  imports: [CommonModule, MatSliderModule],
  templateUrl: './edit-echelle.component.html',
  styleUrls: ['./edit-echelle.component.css']
})
export class EditEchelleComponent {

  componentId: any;
  libelleQuestion = "";
  semantiques: any ;

  constructor(private utilsService: UtilsService,){
    this.componentId = this.utilsService.generateUniqueId();
  }

  ngOnInit(): void {
  }


}