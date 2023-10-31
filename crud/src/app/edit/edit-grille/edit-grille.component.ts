import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface ligneElement {
  libelle: string;
  position: number;
}

const ELEMENT_DATA_LIGNE: ligneElement[] = [];

export interface colonneElement {
  libelle: string;
  position: number;
}

const ELEMENT_DATA_COLONNE: colonneElement[] = [];



@Component({
  selector: 'app-edit-grille',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-grille.component.html',
  styleUrls: ['./edit-grille.component.css']
})
export class EditGrilleComponent {

  showModal: boolean = false;

  libelleQuestion = "";
  dataSourceLignes = [...ELEMENT_DATA_LIGNE];
  dataSourceColonnes = [...ELEMENT_DATA_COLONNE];


  constructor() {

   }

  ngOnInit(): void {
  }


}