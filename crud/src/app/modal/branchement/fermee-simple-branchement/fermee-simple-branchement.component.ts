import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-fermee-simple-branchement',
    templateUrl: './fermee-simple-branchement.component.html',
    styleUrls: ['./fermee-simple-branchement.component.css'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, NgFor]
})
export class FermeeSimpleBranchementComponent implements OnInit {

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