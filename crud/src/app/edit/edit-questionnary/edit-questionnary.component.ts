import { Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { EditFermeeSimpleComponent } from '../edit-fermee-simple/edit-fermee-simple.component';
import { EditFermeeMultipleComponent } from '../edit-fermee-multiple/edit-fermee-multiple.component';
import { EditNotationComponent } from '../edit-notation/edit-notation.component';
import { EditSatisfactionComponent } from '../edit-satisfaction/edit-satisfaction.component';
import { EditEchelleComponent } from '../edit-echelle/edit-echelle.component';
import { EditGrilleComponent } from '../edit-grille/edit-grille.component';

@Component({
  selector: 'app-edit-questionnary',
  standalone: true,
  imports: [MatCardModule, NgClass, FormsModule],
  templateUrl: './edit-questionnary.component.html',
  styleUrls: ['./edit-questionnary.component.css']
})
export class EditQuestionnaryComponent {

  questions: ComponentRef<any>[] = [];
  id_questionnary: any;
  intituleQuestionnaire:string ="";
  statusQuestionnary:string="Saisie Questionnaire";


  @ViewChild('question', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private route: ActivatedRoute,
              private api :ApiService,
              ) { }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.id_questionnary = id;

  }

  ngAfterViewInit() {
    if (this.id_questionnary != undefined){
      this.editQuestion();
    }
  }
  
  editQuestion () {
    this.api.getQuestionnary(this.id_questionnary).subscribe(
      (data) => {
        this.intituleQuestionnaire=data[0].intitule;
        for (let i=0; i<data[0].content.length;i++){
          switch(data[0].content[i].type){
            case 'FermeeSimpleComponent':{
              const questionComponentRef = this.container.createComponent(EditFermeeSimpleComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.modalites= data[0].content[i].modalites;
              this.container.insert(questionComponentRef.hostView);
              this.questions.push(questionComponentRef);
              break;
            }
            case 'FermeeMultipleComponent':{
              const questionComponentRef = this.container.createComponent(EditFermeeMultipleComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.modalites= data[0].content[i].modalites;
              questionComponentRef.instance.maxReponses=data[0].content[i].maxReponses;
              this.container.insert(questionComponentRef.hostView);
              this.questions.push(questionComponentRef);
              break;
            }
            case 'NotationComponent':{
              const questionComponentRef = this.container.createComponent(EditNotationComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.nbStars= data[0].content[i].nbStars;
              questionComponentRef.instance.value= data[0].content[i].note;
              for( let i=0;i< data[0].content[i].note;i++){
                questionComponentRef.instance.imgElements[i].src="http://localhost:4200/assets/images/quaero/star_full.png"
              }
              this.container.insert(questionComponentRef.hostView);
              this.questions.push(questionComponentRef);
              break;
            }
            case 'SatisfactionComponent':{
              const questionComponentRef = this.container.createComponent(EditSatisfactionComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.value= data[0].content[i].note;
              questionComponentRef.instance.echelle = data[0].content[i].echelle;
              this.container.insert(questionComponentRef.hostView);
              this.questions.push(questionComponentRef);
              break;
            }
            case 'GrilleComponent':{
              const questionComponentRef = this.container.createComponent(EditGrilleComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.dataSourceLignes= data[0].content[i].lignes;
              questionComponentRef.instance.dataSourceColonnes= data[0].content[i].colonnes;
              this.container.insert(questionComponentRef.hostView);
              this.questions.push(questionComponentRef);
              break;
            }
            case 'EchelleComponent':{
              const questionComponentRef = this.container.createComponent(EditEchelleComponent);
              questionComponentRef.instance.libelleQuestion= data[0].content[i].question;
              questionComponentRef.instance.semantiques= data[0].content[i].semantiques;
              this.container.insert(questionComponentRef.hostView);
              this.questions.push(questionComponentRef);
              break;
            }
          }
        }
      });
  }

  saveQuestionnary(): void{
    let content:any=[];
    let content_question: any=[];
    let libelle_question: string="";
    let content_modalites: any=[];
    let content_semantiques: any=[]
    let content_lignes: any=[];
    let content_colonnes: any=[];
    for (let i = 0; i < this.questions.length; i++) {
      const componentRef: ComponentRef<any> = this.questions[i] as ComponentRef<any>;
      libelle_question=encodeURIComponent(componentRef.instance.libelleQuestion).replace(/'/g, "''");
      switch(componentRef.componentType.name){
        case 'EditFermeeSimpleComponent':{
          content_modalites=[];
          for (let j = 0; j < componentRef.instance.modalites.length; j++) {
            let isChecked: boolean  =false
            if(componentRef.instance.content == j){
              isChecked = true;
            }
            content_modalites.push({
              "position": componentRef.instance.modalites[j].position, 
              "libelle":encodeURIComponent(componentRef.instance.modalites[j].libelle).replace(/'/g, "''"),
              "isChecked": isChecked
            });
          }
          content_question.push({
            "type": componentRef.componentType.name, 
            "question": libelle_question,
            "modalites": content_modalites
          });
          break;
        }
        case 'EditFermeeMultipleComponent':{
          content_modalites=[];
          for (let j = 0; j < componentRef.instance.modalites.length; j++) {
            content_modalites.push(
              {
                "position": componentRef.instance.modalites[j].position, 
                "libelle":encodeURIComponent(componentRef.instance.modalites[j].libelle).replace(/'/g, "''"),
                "isChecked": componentRef.instance.modalites[j].isChecked
              }
            );
          }
          content_question.push({
            "type": componentRef.componentType.name, 
            "question": libelle_question,
            "modalites" :content_modalites
          });
          break;
        }
        case 'EditNotationComponent':{
          content_question.push({
            "type": componentRef.componentType.name, 
            "note": componentRef.instance.value,
            "question" :libelle_question
          })
          break;
        }
        case 'EditSatisfactionComponent':{
          content_question.push({
            "type": componentRef.componentType.name, 
            "note": componentRef.instance.value,
            "question": libelle_question
          })
          break;
        }
        case 'EditGrilleComponent':{
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
            "type": componentRef.componentType.name, 
            "question": libelle_question,
            "lignes": content_lignes,
            "colonnes": content_colonnes
          })
          break;
        }
        case 'EditEchelleComponent':{
          content_semantiques=[];
          for (let j = 0; j < componentRef.instance.dataSource.length; j++) {
            content_semantiques.push({
              "position": componentRef.instance.dataSource[j].position, 
              "libelleGauche":encodeURIComponent(componentRef.instance.semantiques[j].libelleGauche).replace(/'/g, "''"),
              "libelleDroit":encodeURIComponent(componentRef.instance.semantiques[j].libelleDroit).replace(/'/g, "''")});
          }
          content_question.push({
            "type": componentRef.componentType.name, 
            "question": libelle_question,
            "semantiques": content_semantiques
          });
          break;
        }
      }
    }
    let dateCreation: Date = new Date();
    console.log(content_question)
    content.push({"intitule": encodeURIComponent(this.intituleQuestionnaire).replace(/'/g, "''"), "date": dateCreation, "questions": content_question})
    this.api.insertResult(JSON.stringify(content), this.id_questionnary).subscribe((response: any) => {});
  }
}
