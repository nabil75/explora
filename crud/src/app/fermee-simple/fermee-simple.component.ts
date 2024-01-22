import { Component, ViewChild, ChangeDetectionStrategy, OnInit, Input, NgZone } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { moveItemInArray, CdkDrag, CdkDragHandle, CdkDropList, CdkDragDrop, CdkDragPreview } from '@angular/cdk/drag-drop';
import { NewQuestionnaryComponent } from '../new-questionnary/new-questionnary.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FermeeSimpleModalComponent } from '../modal/afficher-question/fermee-simple-modal/fermee-simple-modal.component';
import { FermeeSimpleBranchementComponent } from '../modal/branchement/fermee-simple-branchement/fermee-simple-branchement.component';

import {AutosizeModule} from 'ngx-autosize';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FermeeSimpleGeneratorComponent } from '../modal/generator/fermee-simple-generator/fermee-simple-generator.component';
import { MatSidenavModule } from '@angular/material/sidenav';



export interface ModaliteElement {
  libelle: string;
  position: number;
  isChecked: boolean;
}

const ELEMENT_DATA: ModaliteElement[] = [];

@Component({
    selector: 'app-fermee-simple',
    templateUrl: './fermee-simple.component.html',
    styleUrls: ['./fermee-simple.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList, FormsModule, FermeeSimpleBranchementComponent, 
              FermeeSimpleModalComponent, CommonModule, NgFor, AutosizeModule, FermeeSimpleGeneratorComponent, 
              MatButtonModule, 
              MatExpansionModule, 
              MatIconModule,
              MatFormFieldModule,
              MatInputModule,
              MatButtonToggleModule,
              MatSidenavModule
            ],
})

export class FermeeSimpleComponent implements OnInit{


  @ViewChild('sideModal') sideModal!: FermeeSimpleBranchementComponent;
  @ViewChild('editFermeeSimple') editFermeeSimple!: FermeeSimpleModalComponent;
  @ViewChild('generatorModal') generatorModal!: FermeeSimpleGeneratorComponent;

  dataSource = [...ELEMENT_DATA];
  componentId: any;
  questions: any= [];
  obligatoire: boolean = true;  
  isCollapse: boolean = false;
  expanded: boolean = false;


  img_collapse_expand: string ="assets/images/quaero/collapse.png";

  libelleQuestion!: string;


  constructor(private eventEmitterService: EventEmitterService,
              private utilsService: UtilsService,
              public collapseQuestionsService: CollapseQuestionsService,
              private newQuestionnary: NewQuestionnaryComponent,
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
    this.questions=[];
    const indexArray = this.newQuestionnary.getQuestionsComponentId();
    const indexArrayFiltered = this.filterNumbersAfterValue(indexArray, this.componentId);
    for (let i = 0; i < this.newQuestionnary.dynamicComponentRefs.length; i++) {
      if (indexArrayFiltered.includes(this.newQuestionnary.dynamicComponentRefs[i].instance['componentId'] )) {
        this.questions.push({"id":this.newQuestionnary.dynamicComponentRefs[i].instance['componentId'],"libelle":this.newQuestionnary.dynamicComponentRefs[i].instance.libelleQuestion});
      }
    }
  }

  remove_question(idQuestion:number){
    this.eventEmitterService.onFirstComponentQuestionClick(idQuestion);
  }

  setValueToExpanded(){
    this.expanded=!this.expanded;
  }

  collapse_question(): void{
      this.isCollapse = !this.isCollapse;
      this.expanded = false;
    if(this.img_collapse_expand == "assets/images/quaero/collapse.png"){
      this.img_collapse_expand = "assets/images/quaero/expand.png"
    }else{
      this.img_collapse_expand = "assets/images/quaero/collapse.png"
    }
  }

  onDrop(event: CdkDragDrop<ModaliteElement>) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    let i: number = 1;
    this.dataSource.forEach( (obj) => {
      obj.position = i;
      i++;
    });
  }

  addModalite() {
    const row ={'position': (this.dataSource.length+1), 'libelle':'', 'isChecked': false};
    this.dataSource.push(row);
  }

  removeModalite(position: number) {
    this.dataSource.splice(position-1,1);
    let i: number = 1;
    this.dataSource.forEach( (obj) => {
      obj.position = i;
      i++;
    });
  }

  onInputChange(event:any, position: number){ 
    this.dataSource.forEach( (obj) => {
      if(obj.position == position){
        obj.libelle = event.target.value;
      }
    });
  }

  display_question_fermee_unique(): void{
    this.editFermeeSimple.openModal();
  }

  openGeneratorModal(): void {
    this.generatorModal.openModal();

  }
  
  receiveQuestion(data:string){
    this.libelleQuestion = data;
  }

}
