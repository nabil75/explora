import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-fermee-simple-generator',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, NgFor],
  templateUrl: './fermee-simple-generator.component.html',
  styleUrls: ['./fermee-simple-generator.component.css']
})
export class FermeeSimpleGeneratorComponent {
  
  @Output() newQuestionEvent = new EventEmitter<string>();
  
  showModal: boolean = false;
  proposition: string="";
  constructor(private api :ApiService,
  ) { }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  genererQuestion(){
    this.api.getQuestionnaryFromLmstudio().subscribe((response: any) => {
      this.proposition = response.content;
    });
  }
  sendProposition(){
    this.newQuestionEvent.emit(this.proposition);
  }
}
