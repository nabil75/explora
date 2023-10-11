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
    selector: 'app-notation',
    templateUrl: './notation.component.html',
    styleUrls: ['./notation.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [FormsModule, BranchementModalComponent, CommonModule, MatButtonModule, NgFor, RatingModule ],
})

export class NotationComponent implements OnInit{


  @ViewChild('sideModal') sideModal!: BranchementModalComponent;
  @ViewChild('myComponent') myComponent!: ElementRef;

  componentId: any;
  public questions: any= [];
  obligatoire: boolean = true;

  img_collapse_expand: string ="assets/images/quaero/collapse.png";

  img_etoile: string ="assets/images/quaero/star_empty.png";

  libelleQuestion!: string;

  imgElements:any;

  Arr = Array; //Array type captured in a variable
  nbStars: number = 10
  // max: number = this.nbStars;
  value: number = 0;


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
    this.imgElements = this.myComponent.nativeElement.querySelectorAll('.img-etoile');   
    for( let i=0;i< this.value;i++){
      this.imgElements[i].src = "assets/images/quaero/star_full.png"
    }
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

  change_image(n: number): void {
    this.ngAfterViewInit();
    this.value = +n+1;
    const listImg = this.imgElements;
    for (let element of listImg) {
      let elTitle = element.title;
      let el = +n + 1;  
      if (Number(elTitle) <= el ) {
        element.src = "assets/images/quaero/star_full.png";
      } else {
        element.src = "assets/images/quaero/star_empty.png";
      }
    }
    console.log("After change nb stars : "+this.value)
  }

  all_empty_image(){
    this.ngAfterViewInit();
    this.value=0;
    console.log("After empty all : "+this.value)
    const listImg = this.imgElements;
    for (let element of listImg) {
      element.src = "assets/images/quaero/star_empty.png";
    }
  }

  display_question_notation(){

  }
}
