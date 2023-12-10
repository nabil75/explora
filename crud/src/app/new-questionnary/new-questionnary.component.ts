import { Component, ViewChild, ViewContainerRef, ComponentRef, OnInit, Input } from '@angular/core';
import { FermeeSimpleComponent } from '../fermee-simple/fermee-simple.component';
import { FermeeMultipleComponent } from '../fermee-multiple/fermee-multiple.component';
import { EchelleComponent  } from '../echelle/echelle.component';
import { GrilleComponent } from '../grille/grille.component';
import { EventEmitterService } from '../services/event-emitter.service';
import { CollapseQuestionsService } from '../services/collapse-questions.service';
import { moveItemInArray, CdkDropList } from '@angular/cdk/drag-drop';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NotationComponent } from '../notation/notation.component';
import { SatisfactionComponent } from '../satisfaction/satisfaction.component';
import { AutosizeModule } from 'ngx-autosize';

@Component({
    selector: 'app-new-questionnary',
    templateUrl: './new-questionnary.component.html',
    styleUrls: ['./new-questionnary.component.css'],
    standalone: true,
    imports: [
        MatCardModule,
        NgClass,
        FormsModule,
        CdkDropList,
        AutosizeModule
    ],
})

export class NewQuestionnaryComponent implements OnInit {

  public dynamicComponentRefs: ComponentRef<any>[] = [];
  id_questionnary: any;
  img_collapse_expand_all: string ="assets/images/quaero/collapse_all.png";
  intituleQuestionnaire:string ="";
  statusQuestionnary:string="Nouveau Questionnaire";


  @ViewChild('question', { read: ViewContainerRef }) container!: ViewContainerRef;

  @Input() questionnaries: any;

  constructor(private eventEmitterService: EventEmitterService,
              private collapseQuestionsService: CollapseQuestionsService,
              private api :ApiService,
              private route: ActivatedRoute,
            ) { }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.id_questionnary = id;
  }

  ngAfterViewInit() {
    this.eventEmitterService.invokeFirstComponentFunction.subscribe((idQuestion:number) => {
      this.removeComponent(idQuestion);
    });
    if (this.id_questionnary != undefined){
      this.editQuestion();
    }
  }
  
  editQuestion () {
    this.api.getQuestionnary(this.id_questionnary).subscribe(
      (data) => {
        this.intituleQuestionnaire=data[0].intitule;
        this.statusQuestionnary = "Modifier Questionnaire";
        for (let i=0; i<data[0].content.length;i++){
          switch(data[0].content[i].type){
            case 'FermeeSimpleComponent':{
              const questionComponentRef = this.container.createComponent(FermeeSimpleComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.dataSource= data[0].content[i].modalites;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'FermeeMultipleComponent':{
              const questionComponentRef = this.container.createComponent(FermeeMultipleComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.dataSource= data[0].content[i].modalites;
              questionComponentRef.instance.maxReponses=data[0].content[i].maxReponses;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'NotationComponent':{
              const questionComponentRef = this.container.createComponent(NotationComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.nbStars= data[0].content[i].nbStars;
              questionComponentRef.instance.value= data[0].content[i].note;
              for( let i=0;i< data[0].content[i].note;i++){
                questionComponentRef.instance.imgElements[i].src="http://localhost:4200/assets/images/quaero/star_full.png"
              }
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'SatisfactionComponent':{
              const questionComponentRef = this.container.createComponent(SatisfactionComponent);
              questionComponentRef.instance.libelleQuestion = data[0].content[i].question;
              questionComponentRef.instance.value = data[0].content[i].note;
              questionComponentRef.instance.echelle = data[0].content[i].echelle;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'GrilleComponent':{
              const questionComponentRef = this.container.createComponent(GrilleComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.dataSourceLignes= data[0].content[i].lignes;
              questionComponentRef.instance.dataSourceColonnes= data[0].content[i].colonnes;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
            case 'EchelleComponent':{
              const questionComponentRef = this.container.createComponent(EchelleComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.dataSource= data[0].content[i].semantiques;
              this.container.insert(questionComponentRef.hostView);
              this.dynamicComponentRefs.push(questionComponentRef);
              break;
            }
          }
        }
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
    const fermeeSimpleComponentRef = this.container.createComponent(FermeeSimpleComponent);
    this.dynamicComponentRefs.push(fermeeSimpleComponentRef);
  }

  createFermeeMultiple() {
    const fermeeMultipleComponentRef = this.container.createComponent(FermeeMultipleComponent);
    this.dynamicComponentRefs.push(fermeeMultipleComponentRef);
  }
  createGrille() {
    const grilleComponentRef = this.container.createComponent(GrilleComponent);
    this.dynamicComponentRefs.push(grilleComponentRef);
  }
  createEchelle() {
    const echelleComponentRef = this.container.createComponent(EchelleComponent);
    this.dynamicComponentRefs.push(echelleComponentRef);
  }
  
  createNotation() {
    const notationComponentRef = this.container.createComponent(NotationComponent);
    this.dynamicComponentRefs.push(notationComponentRef);
  }

  createSatisfaction(){
    const satisfactionComponentRef = this.container.createComponent(SatisfactionComponent);
    this.dynamicComponentRefs.push(satisfactionComponentRef);
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
    let content_semantiques: any=[]
    let content_lignes: any=[];
    let content_colonnes: any=[];
    for (let i = 0; i < this.dynamicComponentRefs.length; i++) {
      const componentRef: ComponentRef<any> = this.dynamicComponentRefs[i] as ComponentRef<any>;
      quest=encodeURIComponent(componentRef.instance.libelleQuestion).replace(/'/g, "''");
      switch(componentRef.componentType.name){
        case 'FermeeSimpleComponent':{
          content_modalites=[];
          for (let j = 0; j < componentRef.instance.dataSource.length; j++) {
            content_modalites.push({
              "position": componentRef.instance.dataSource[j].position, 
              "libelle":encodeURIComponent(componentRef.instance.dataSource[j].libelle).replace(/'/g, "''"),
              "isChecked": componentRef.instance.dataSource[j].isChecked
            });
          }
          content_question.push({
            type: componentRef.componentType.name, 
            obligatoire: componentRef.instance.obligatoire,
            question:quest,
            modalites:content_modalites
          });
          break;
        }
        case 'FermeeMultipleComponent':{
          content_modalites=[];
          for (let j = 0; j < componentRef.instance.dataSource.length; j++) {
            content_modalites.push({
              "position": componentRef.instance.dataSource[j].position, 
              "libelle":encodeURIComponent(componentRef.instance.dataSource[j].libelle).replace(/'/g, "''"), 
              "isChecked":componentRef.instance.dataSource[j].isChecked
            });
          }
          content_question.push({
            type: componentRef.componentType.name, 
            obligatoire: componentRef.instance.obligatoire,
            ordonnee: componentRef.instance.ordonnee,
            maxReponses: componentRef.instance.maxReponses,
            question:quest,
            modalites:content_modalites
          });
          break;
        }
        case 'NotationComponent':{
          content_question.push({
            type: componentRef.componentType.name, 
            obligatoire: componentRef.instance.obligatoire,
            nbStars: componentRef.instance.nbStars,
            note: componentRef.instance.value,
            question:quest
          })
          break;
        }
        case 'SatisfactionComponent':{
          content_question.push({
            type: componentRef.componentType.name, 
            obligatoire: componentRef.instance.obligatoire,
            note: componentRef.instance.value,
            echelle: componentRef.instance.echelle,
            question:quest
          })
          break;
        }
        case 'GrilleComponent':{
          content_lignes=[];
          content_colonnes=[];
          for (let j = 0; j < componentRef.instance.dataSourceLignes.length; j++) {
            content_lignes.push({
              "position": componentRef.instance.dataSourceLignes[j].position, 
              "libelle":encodeURIComponent(componentRef.instance.dataSourceLignes[j].libelle).replace(/'/g, "''")
            });
          }
          for (let j = 0; j < componentRef.instance.dataSourceColonnes.length; j++) {
            content_colonnes.push({
              "position": componentRef.instance.dataSourceColonnes[j].position, 
              "libelle":encodeURIComponent(componentRef.instance.dataSourceColonnes[j].libelle).replace(/'/g, "''")
            });
          }
          content_question.push({
            type: componentRef.componentType.name, 
            obligatoire: componentRef.instance.obligatoire,
            question:quest,
            lignes:content_lignes,
            colonnes:content_colonnes
          })
          break;
        }
        case 'EchelleComponent':{
          content_semantiques=[];
          for (let j = 0; j < componentRef.instance.dataSource.length; j++) {
            content_semantiques.push({
              "position": componentRef.instance.dataSource[j].position, 
              "libelleGauche":encodeURIComponent(componentRef.instance.dataSource[j].libelleGauche).replace(/'/g, "''"),
              "libelleDroit":encodeURIComponent(componentRef.instance.dataSource[j].libelleDroit).replace(/'/g, "''")});
          }
          content_question.push({
            type: componentRef.componentType.name, 
            obligatoire: componentRef.instance.obligatoire,
            ordonnee: componentRef.instance.ordonnee,
            maxReponses: componentRef.instance.maxReponses,
            question:quest,
            semantiques:content_semantiques
          });
          break;
        }
      }
    }
    let dateCreation: Date = new Date();
    content.push({intitule: encodeURIComponent(this.intituleQuestionnaire).replace(/'/g, "''"), date:dateCreation, questions:content_question})

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

  generateQuestionnary () {
    this.api.getQuestionnaryFromLmstudio().subscribe((response: any) => {
      console.log(response.content)
    });
  }
}
