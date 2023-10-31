import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-satisfaction',
  standalone: true,
  imports: [CommonModule,FormsModule, NgFor],
  templateUrl: './edit-satisfaction.component.html',
  styleUrls: ['./edit-satisfaction.component.css']
})

export class EditSatisfactionComponent {

  libelleQuestion: string="";
  value: string = "";
  echelle: string="";

  ngOnInit(){
    
  }

  change_note(event: any): void {
    let elData = event.target.getAttribute('data-value');
    switch(elData){
      case '1': {
        this.value="1";
      }
      break;
      case '2': {
        this.value="2";
      }
      break;
      case '3': {
        this.value="3";
      }
      break;
      case '4': {
        this.value="4";
      }
      break;
      case '5': {
        this.value="5";
      }
      break;
      case '6': {
        this.value="6";
      }
      break;
      case '7': {
        this.value="7";
      }
      break;
    }
}
}
