import { Component, ViewChild, ChangeDetectionStrategy, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { BranchementModalComponent } from '../modal/branchement/branchement-modal.component';
import { NewQuestionnaryComponent } from '../new-questionnary/new-questionnary.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList } from '@angular/cdk/drag-drop';
import { SatisfactionModalComponent } from '../modal/satisfaction-modal/satisfaction-modal.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AutosizeModule } from 'ngx-autosize';

@Component({
    selector: 'app-satisfaction',
    templateUrl: './satisfaction.component.html',
    styleUrls: ['./satisfaction.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList, FormsModule, 
              BranchementModalComponent, SatisfactionModalComponent, CommonModule, 
              MatButtonModule, NgFor, RatingModule, MatButtonToggleModule, MatIconModule, AutosizeModule
             ],
})

export class SatisfactionComponent implements OnInit{


  @ViewChild('sideModal') sideModal!: BranchementModalComponent;
  @ViewChild('editSatisfaction') editSatisfaction!: SatisfactionModalComponent;

  componentId: any;
  questions: any= [];
  obligatoire: boolean = true;
  img_collapse_expand: string ="assets/images/quaero/collapse.png";
  img_etoile: string ="assets/images/quaero/star_empty.png";
  libelleQuestion!: string;
  value: string = "";
  echelle: string ="";

  constructor(  private eventEmitterService: EventEmitterService,
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

  display_question_satisfaction(){
    this.editSatisfaction.openModal();
  }

  onClickTypeEchelle(event:any):void{
    console.log(this.echelle)
  }
}
