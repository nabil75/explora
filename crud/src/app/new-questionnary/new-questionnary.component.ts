import { Component, ViewChild, ViewContainerRef, ComponentRef, OnInit, Input  } from '@angular/core';
import { FermeeSimpleComponent } from '../fermee-simple/fermee-simple.component';
import { FermeeMultipleComponent } from '../fermee-multiple/fermee-multiple.component';
import { EventEmitterService } from '../services/event-emitter.service';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { IndexedDbService } from '../services/indexed-db.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { ModaliteSimpleComponent } from '../modalites/modalite-simple/modalite-simple/modalite-simple.component';


@Component({
  selector: 'app-new-questionnary',
  templateUrl: './new-questionnary.component.html',
  styleUrls: ['./new-questionnary.component.css'],

})

export class NewQuestionnaryComponent implements OnInit {
  [x: string]: any;

  public dynamicComponentRefs: ComponentRef<any>[] = [];
  id_questionnary: any;
  img_collapse_expand_all: string ="assets/images/quaero/collapse_all.png";
  intituleQuestionnaire:string ="";
  statusQuestionnary:string="Nouveau Questionnaire";

  @ViewChild('question', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('containerModalite', { read: ViewContainerRef }) containerModalite!: ViewContainerRef;

  @Input() questionnaries: any;

  constructor(private eventEmitterService: EventEmitterService,
              private collapseQuestionsService: CollapseQuestionsService,
              // private indexedDb :IndexedDbService,
              private api :ApiService,
              private route: ActivatedRoute,
            ) {}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.id_questionnary = id;

  }

  ngAfterViewInit() {
    this.eventEmitterService.invokeFirstComponentFunction.subscribe((idQuestion:number) => {
      this.removeComponent(idQuestion);
    });
    if (this.id_questionnary != undefined){
      this.editQuestionnary();
    }
  }
  
  editQuestionnary () {
    this.api.getQuestionnary(this.id_questionnary).subscribe(
      (data) => {

        this.intituleQuestionnaire=data[0].intitule;
        this.statusQuestionnary = "Modifier Questionnaire"
        const questionComponentRef = this.container.createComponent(FermeeSimpleComponent);
        this.container.insert(questionComponentRef.hostView);
        this.dynamicComponentRefs.push(questionComponentRef);
        questionComponentRef.instance.add_modalite_simple();
        
        console.log(questionComponentRef.instance.componentId);
        console.log(this.dynamicComponentRefs)
      });
  }

  getQuestionsComponentId(){
    const indexArray: any = [];
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      indexArray.push(componentRef.instance.componentId)
    }
    return indexArray
  }

  createFermeeSimple() {
    // Créer une instance de question fermée simple
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FermeeSimpleComponent);
    const fermeeSimpleComponentRef = this.container.createComponent(FermeeSimpleComponent);
    this.dynamicComponentRefs.push(fermeeSimpleComponentRef);
    console.log(this.dynamicComponentRefs);
  }

  createFermeeMultiple() {
    // Créer une instance de question fermée multiple
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FermeeMultipleComponent);
    const fermeeMultipleComponentRef = this.container.createComponent(FermeeMultipleComponent);
    this.dynamicComponentRefs.push(fermeeMultipleComponentRef);
  }

  removeComponent(idComponent: number) {
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      if (componentRef.instance['componentId'] === idComponent) {
        componentRef.destroy();
        this.dynamicComponentRefs.splice(i, 1);
      }
    }
  }

  removeAllComponents() {
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      componentRef.destroy();
      this.dynamicComponentRefs.splice(i, 0);
    }
  }

  renderComponents() {
    this.dynamicComponentRefs.forEach(component => {
      this.container.insert(component.hostView);
    });
  }

  onDrop(event: any) {
    moveItemInArray(this.dynamicComponentRefs, event.previousIndex, event.currentIndex);
    this.renderComponents();
  }

  isShowMenuQuestions = true;
  isShowMenuCurrentQuestions = true;
  isShowMenuOthersQuestions = true;

  displayMenuQuestions(): void{
    this.isShowMenuQuestions = !this.isShowMenuQuestions;
  }

  displayMenuCurrentQuestions(): void{
    this.isShowMenuCurrentQuestions = !this.isShowMenuCurrentQuestions;
  }

  displayMenuOthersQuestions(): void{
    this.isShowMenuOthersQuestions = !this.isShowMenuOthersQuestions;
  }

  saveQuestionnary(): void{
    let content:any=[];
    let content_question: any=[];
    let quest: string="";
    let content_modalites: any=[];
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      quest=encodeURIComponent(componentRef.instance.libelleQuestion);
      content_modalites=[];
      for (let j = 0; j < componentRef.instance.dynamicComponentModaliteRefs.length; j++) {
        content_modalites.push(encodeURIComponent(componentRef.instance.dynamicComponentModaliteRefs[j].instance.libelleModalite))
      }
      content_question.push({question:quest,modalites:content_modalites})
    }
    let dateCreation: Date = new Date(); //formatDate(new Date(),'dd/MM/yyyy', this.locale);
    console.log(dateCreation)
    content.push({intitule: encodeURIComponent(this.intituleQuestionnaire), date:dateCreation, questions:content_question})
    if(this.id_questionnary == undefined){
      this.api.saveQuestionnary(JSON.stringify(content)).subscribe((response: any) => {
        this.id_questionnary = response
      });
    }else {
      this.api.updateQuestionnary(this.id_questionnary, JSON.stringify(content)).subscribe((response: any) => {
      });
    };
  }

  collapseQuestions(){
    this.collapseQuestionsService.isCollapseAll = !this.collapseQuestionsService.isCollapseAll;
    if(this.img_collapse_expand_all == "assets/images/quaero/collapse_all.png"){
      this.img_collapse_expand_all = "assets/images/quaero/expand_all.png";
    }else{
      this.img_collapse_expand_all = "assets/images/quaero/collapse_all.png";
    }
    this.changeImgCollapse();
  }

  changeImgCollapse(){
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      if(this.img_collapse_expand_all == "assets/images/quaero/collapse_all.png"){
        componentRef.instance.img_collapse_expand = "assets/images/quaero/collapse.png";
      }else{
        componentRef.instance.img_collapse_expand = "assets/images/quaero/expand.png";
      }
      componentRef.instance.isCollapse = this.collapseQuestionsService.isCollapseAll;
    }
  }

    // saveData(): void{
    //   const date = new Date();
    //   this.indexedDb.storeData('100300001', {'siren':'100300001', 'denomination':'LOREM','TypeDeTache':'Validation de la cotation', 'date': date})
    // }

    // retrieveDataFromIDB(){
    //   console.log(this.indexedDb.retrieveData('200300002'));
    // }

    // getAllDataFromIDB(){
    //   this.indexedDb.getAllData()
    //     .then((data) => {
    //       //Insérer ici votre code en cas de succès
    //       console.log('Données contenues dans la IndexedDb : ', data);
    //     })
    //     .catch((error) => {
    //       // Insérer ici votre code en cas d'erreur
    //       console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    //     });
    // }
}
