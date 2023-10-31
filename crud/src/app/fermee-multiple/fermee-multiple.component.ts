import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { moveItemInArray, CdkDrag, CdkDragHandle, CdkDropList, CdkDragPreview, CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BranchementModalComponent } from '../modal/branchement/branchement-modal.component';
import { NewQuestionnaryComponent } from '../new-questionnary/new-questionnary.component';
import { FermeeMultipleModalComponent } from '../modal/fermee-multiple-modal/fermee-multiple-modal.component';
import { AutosizeModule } from 'ngx-autosize';

export interface ModaliteElement {
  libelle: string;
  position: number;
  isChecked: boolean;
}

const ELEMENT_DATA: ModaliteElement[] = [];


@Component({
    selector: 'app-fermee-multiple',
    templateUrl: './fermee-multiple.component.html',
    styleUrls: ['./fermee-multiple.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList,FormsModule, BranchementModalComponent, CommonModule, MatButtonModule, 
              NgFor, FermeeMultipleModalComponent, AutosizeModule
            ]
})
export class FermeeMultipleComponent implements OnInit {


  
  @ViewChild('sideModal') sideModal!: BranchementModalComponent;
  @ViewChild('editFermeeMultiple') editFermeeMultiple!: FermeeMultipleModalComponent;

  dataSource = [...ELEMENT_DATA];

  maxReponses: number =0;
  obligatoire: boolean = true;
  ordonnee: boolean = false;
  componentId: any;
  dynamicComponentModaliteRefs: ComponentRef<any>[] = [];
  questions: any[]= [];

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
    if(this.maxReponses>this.dataSource.length){
      this.maxReponses=this.dataSource.length;
    }
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
    const row ={'position': (this.dataSource.length+1), 'libelle':'', 'isChecked':false};
    this.dataSource.push(row);
    this.maxReponses=this.maxReponses+1;
  }

  removeModalite(position: number) {
    this.dataSource.splice(position-1,1);
    let i: number = 1;
    this.dataSource.forEach( (obj) => {
      obj.position = i;
      i++;
    });
    this.ngOnInit();
  }

  onInputChange(event:any, position: number){ 
    this.dataSource.forEach( (obj) => {
      if(obj.position == position){
        obj.libelle = event.target.value;
      }
    });
  }

  display_question_fermee_multiple(){
    this.editFermeeMultiple.openModal();
  }

  controle_nombre_reponses(){

  }
  onKeyup(event:any){
    if (event.target.value > this.dataSource.length) {
      event.target.value = "";
    }
  }
}
