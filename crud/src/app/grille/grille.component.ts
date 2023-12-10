import { Component, ComponentRef, ViewChild, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { moveItemInArray, CdkDrag, CdkDragHandle, CdkDropList, CdkDragDrop, CdkDragPreview } from '@angular/cdk/drag-drop';
import { NewQuestionnaryComponent } from '../new-questionnary/new-questionnary.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GrilleModalComponent } from '../modal/afficher-question/grille-modal/grille-modal.component';
import { AutosizeModule } from 'ngx-autosize';
import { GrilleBranchementComponent } from '../modal/branchement/grille-branchement/grille-branchement.component';


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
    selector: 'app-grille',
    templateUrl: './grille.component.html',
    styleUrls: ['./grille.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList, FormsModule, GrilleBranchementComponent, 
              GrilleModalComponent, CommonModule, MatButtonModule, NgFor, AutosizeModule
            ],
})

export class GrilleComponent implements OnInit{


  @ViewChild('sideModal') sideModal!: GrilleBranchementComponent;
  @ViewChild('editGrille') editGrille!: GrilleModalComponent;

  dataSourceLignes = [...ELEMENT_DATA_LIGNE];
  dataSourceColonnes = [...ELEMENT_DATA_COLONNE];
  componentId: any;
  public questions: any= [];
  obligatoire: boolean = true;

  img_collapse_expand: string ="assets/images/quaero/collapse.png";

  libelleQuestion!: string;


  constructor(private eventEmitterService: EventEmitterService,
              private utilsService: UtilsService,
              public collapseQuestionsService: CollapseQuestionsService
              ){
              this.componentId = this.utilsService.generateUniqueId();
            }

  ngOnInit(){

  }

  ngAfterViewInit() {

  }

  filterNumbersAfterValue(arr: number[], value: number): number[] {
    const filteredArray = arr.filter((num) => num > value);
    return filteredArray;
  }

  openSideModal(): void {
    this.sideModal.openModal();
  }

  remove_question(idQuestion:number){
    this.eventEmitterService.onFirstComponentQuestionClick(idQuestion);
  }

  isCollapse: boolean = false;
  collapse_question(): void{
      this.isCollapse = !this.isCollapse;
    if(this.img_collapse_expand == "assets/images/quaero/collapse.png"){
      this.img_collapse_expand = "assets/images/quaero/expand.png"
    }else{
      this.img_collapse_expand = "assets/images/quaero/collapse.png"
    }
  }

  onDropLigne(event: CdkDragDrop<ligneElement>) {
    moveItemInArray(this.dataSourceLignes, event.previousIndex, event.currentIndex);
    let i: number = 1;
    this.dataSourceLignes.forEach( (obj) => {
      obj.position = i;
      i++;
    });
  }
  onDropColonne(event: CdkDragDrop<colonneElement>) {
    moveItemInArray(this.dataSourceColonnes, event.previousIndex, event.currentIndex);
    let i: number = 1;
    this.dataSourceColonnes.forEach( (obj) => {
      obj.position = i;
      i++;
    });
  }

  addLigne() {
    const row ={'position': (this.dataSourceLignes.length+1), 'libelle':''};
    this.dataSourceLignes.push(row);
  }

  removeLigne(position: number) {
    this.dataSourceLignes.splice(position-1,1);
    let i: number = 1;
    this.dataSourceLignes.forEach( (obj) => {
      obj.position = i;
      i++;
    });
  }
  addColonne() {
    const row ={'position': (this.dataSourceColonnes.length+1), 'libelle':''};
    this.dataSourceColonnes.push(row);
  }

  removeColonne(position: number) {
    this.dataSourceColonnes.splice(position-1,1);
    let i: number = 1;
    this.dataSourceColonnes.forEach( (obj) => {
      obj.position = i;
      i++;
    });
  }

  onInputChangeLigne(event:any, position: number){ 
    this.dataSourceLignes.forEach( (obj) => {
      if(obj.position == position){
        obj.libelle = event.target.value;
      }
    });
  }
  onInputChangeColonne(event:any, position: number){ 
    this.dataSourceColonnes.forEach( (obj) => {
      if(obj.position == position){
        obj.libelle = event.target.value;
      }
    });
  }

  display_question_grille(){
    this.editGrille.openModal();
  }

  generateQuestion(id: number){

  }
}
