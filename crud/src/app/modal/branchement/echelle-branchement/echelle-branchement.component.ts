

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-echelle-branchement',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, NgFor],
  templateUrl: './echelle-branchement.component.html',
  styleUrls: ['./echelle-branchement.component.css']
})
export class EchelleBranchementComponent implements OnInit {

  showModal: boolean = false;

  @Input() titre = "";
  @Input() modalites: any ;
  @Input() questions: any;


  constructor() {

   }

  ngOnInit(): void {
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}