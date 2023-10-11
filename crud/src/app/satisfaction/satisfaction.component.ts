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




@Component({
    selector: 'app-satisfaction',
    templateUrl: './satisfaction.component.html',
    styleUrls: ['./satisfaction.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [FormsModule, BranchementModalComponent, CommonModule, MatButtonModule, NgFor, RatingModule ],
})

export class SatisfactionComponent implements OnInit{


  @ViewChild('sideModal') sideModal!: BranchementModalComponent;

  componentId: any;
  questions: any= [];
  obligatoire: boolean = true;
  img_collapse_expand: string ="assets/images/quaero/collapse.png";
  img_etoile: string ="assets/images/quaero/star_empty.png";
  libelleQuestion!: string;
  value: string = "";


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
    // this.imgElements = this.myComponent.nativeElement.querySelectorAll('.img-smiley');   
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
      let elTitle = event.target.title;
      switch(elTitle){
        case 'Très insatisfait': {
          this.value="1";
        }
        break;
        case 'Plutôt insatisfait': {
          this.value="2";
        }
        break;
        case 'Moyennement satisfait': {
          this.value="3";
        }
        break;
        case 'Plutôt satisfait': {
          this.value="4";
        }
        break;
        case 'Très satisfait': {
          this.value="5";
        }
        break;
      }
  }

  display_question_satisfaction(){

  }
}
