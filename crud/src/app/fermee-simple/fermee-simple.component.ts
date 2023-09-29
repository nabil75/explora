import { Component, ComponentRef, ViewChild, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ModaliteSimpleComponent } from '../modalites/modalite-simple/modalite-simple/modalite-simple.component';
import { ModaliteAutreComponent } from '../modalites/modalite-autre/modalite-autre/modalite-autre.component';
import { ModaliteNcComponent } from '../modalites/modalite-nc/modalite-nc/modalite-nc.component';
import { ModaliteNspComponent } from '../modalites/modalite-nsp/modalite-nsp/modalite-nsp.component';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { BranchementModalComponent } from '../modal/branchement/branchement-modal/branchement-modal.component';
import { NewQuestionnaryComponent } from '../new-questionnary/new-questionnary.component';

@Component({
  selector: 'app-fermee-simple',
  templateUrl: './fermee-simple.component.html',
  styleUrls: ['./fermee-simple.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class FermeeSimpleComponent {

  @ViewChild('containerModalite', { read: ViewContainerRef })
  containerModalite!: ViewContainerRef;
  @ViewChild('sideModal') sideModal!: BranchementModalComponent;


  componentId: any;
  public dynamicComponentModaliteRefs: ComponentRef<any>[] = [];
  public questions: any[]= [];

  img_ajout_modalite : string = "assets/images/quaero/plus.png";
  img_collapse_expand: string ="assets/images/quaero/collapse.png";

  libelleQuestion!: string;
  showComponentModalite = false;


  constructor(private eventEmitterService: EventEmitterService,
              private utilsService: UtilsService,
              public collapseQuestionsService: CollapseQuestionsService,
              private newQuestionnary: NewQuestionnaryComponent
              ){
              this.componentId = this.utilsService.generateUniqueId();
            }

  ngOnInit(){

  }

  ngAfterViewInit() {
    this.eventEmitterService.invokeFirstComponentFunction.subscribe((idModalite:number) => {
    this.removeComponentModalite(idModalite);
    });
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

  renderComponents() {
    this.dynamicComponentModaliteRefs.forEach(component => {
      this.containerModalite.insert(component.hostView);
    });
  }

  onDrop(event: any) {
    moveItemInArray(this.dynamicComponentModaliteRefs, event.previousIndex, event.currentIndex);
    this.renderComponents();
  }
  displayMenuQuestions(): void{

  }


  modify_branchement_content_after_modalite_change(){

  }

  modalite_value_before_change(){

  }

  isShowModaliteOptions = true;
  display_options_modalite(): void{
    this.isShowModaliteOptions = !this.isShowModaliteOptions;
    if(this.img_ajout_modalite =="assets/images/quaero/plus.png"){
      this.img_ajout_modalite = "assets/images/quaero/moins.png"
    }else{
      this.img_ajout_modalite = "assets/images/quaero/plus.png"
    }
  }

  add_modalite_simple(){
    const modaliteComponentRef = this.containerModalite.createComponent(ModaliteSimpleComponent);
    // this.containerModalite.insert(modaliteComponentRef.hostView);
    this.dynamicComponentModaliteRefs.push(modaliteComponentRef);
  }

  add_modalite_autre(){
    const modaliteAutreComponentRef = this.containerModalite.createComponent(ModaliteAutreComponent);
    this.dynamicComponentModaliteRefs.push(modaliteAutreComponentRef);
  }
  add_modalite_nsp(){
    const modaliteNspComponentRef = this.containerModalite.createComponent(ModaliteNspComponent);
    this.dynamicComponentModaliteRefs.push(modaliteNspComponentRef);
  }
  add_modalite_nc(){
    const modaliteNcComponentRef = this.containerModalite.createComponent(ModaliteNcComponent);
    this.dynamicComponentModaliteRefs.push(modaliteNcComponentRef);
  }

  removeComponentModalite(id: number) {
    for (let i = 0; i < this.dynamicComponentModaliteRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentModaliteRefs[i] as ComponentRef<any>;
      if (componentRef.instance['componentId'] === id) {
        componentRef.destroy();
        this.dynamicComponentModaliteRefs.splice(i, 1);
      }
    }
  }

  display_modal_branchement(){

  }
  display_question_fermee_unique(){

  }
}
