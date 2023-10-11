import { Component, ComponentRef, ViewChild, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { moveItemInArray, CdkDrag, CdkDragHandle, CdkDropList, CdkDragDrop, CdkDragPreview } from '@angular/cdk/drag-drop';
import { BranchementModalComponent } from '../modal/branchement/branchement-modal.component';
import { NewQuestionnaryComponent } from '../new-questionnary/new-questionnary.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


export interface ModaliteElement {
  libelle: string;
  position: number;
}

const ELEMENT_DATA: ModaliteElement[] = [];

@Component({
    selector: 'app-fermee-simple',
    templateUrl: './fermee-simple.component.html',
    styleUrls: ['./fermee-simple.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [CdkDrag, CdkDragHandle, CdkDragPreview, FormsModule, CdkDropList, BranchementModalComponent, CommonModule, MatButtonModule, NgFor],
})

export class FermeeSimpleComponent implements OnInit{


  @ViewChild('sideModal') sideModal!: BranchementModalComponent;

  dataSource = [...ELEMENT_DATA];
  componentId: any;
  public questions: any= [];
  obligatoire: boolean = true;

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

  isCollapse: boolean = false;
  collapse_question(): void{
      this.isCollapse = !this.isCollapse;
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
    const row ={'position': (this.dataSource.length+1), 'libelle':''};
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
    console.log(this.dataSource)
  }

  display_question_fermee_unique(){
    
  }
}
