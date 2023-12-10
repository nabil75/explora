import { Component } from '@angular/core';
import { CommonModule, PercentPipe, formatPercent } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { BarComponent } from 'src/app/graph/bar/bar.component';
import { PieComponent } from 'src/app/graph/pie/pie.component';
import { ScatterComponent } from 'src/app/graph/scatter/scatter.component';
import { LineComponent } from 'src/app/graph/line/line.component';

@Component({
  selector: 'app-resultat-simple',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BarComponent,
    PieComponent,
    ScatterComponent,
    LineComponent

  ],
  templateUrl: './resultat-simple.component.html',
  styleUrls: ['./resultat-simple.component.css']
})
export class ResultatSimpleComponent {

  data:any;
  message = "Aucun tableau ou graphique à afficher";
  styleMessage: string='';
  status: string = "Explorer les tendances";
  id_questionnary: any;
  questions: string[] = [];
  dataSourceTableau = [{ "label": "", "value": 0, "percentage":0 }];
  sumDataSourceTableau: number=0;
  numQuestion: string = "";

  isMessage: boolean = true;
  isTableau: boolean = false;
  isBarChart: boolean = false;
  isPieChart: boolean = false;
  isScatterChart: boolean = false;
  isLineChart: boolean = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_questionnary = id;
    this.recoverQuestions();
  }

  recoverQuestions() {
    this.api.getQuestionnary(this.id_questionnary).subscribe(
      (data) => {
        this.status = data[0].intitule;
        this.questions = []
        for (let i = 0; i < data[0].content.length; i++) {
          this.questions.push(data[0].content[i].question);
        }
      });
  }

  isShowMenuAnalyse = true;
  isShowMenuAnalyseUnivariee = true;
  isShowMenuAnalyseBivariee = true;
  isShowMenuAnalyseMultifactorielle = true;

  displayMenuAnalyse(): void {
    this.isShowMenuAnalyse = !this.isShowMenuAnalyse;
  }

  displayMenuAnalyseUnivariee(): void {
    this.isShowMenuAnalyseUnivariee = !this.isShowMenuAnalyseUnivariee;
  }

  displayMenuAnalyseBivariee(): void {
    this.isShowMenuAnalyseBivariee = !this.isShowMenuAnalyseBivariee;
  }

  displayMenuAnalyseMultifactorielle(): void {
    this.isShowMenuAnalyseMultifactorielle = !this.isShowMenuAnalyseMultifactorielle;
  }

  getValQuestion(i: string) {
    this.numQuestion = i;
    this.message = "Choisissez un type de représentation";
    this.styleMessage="color:red;padding: 10px; font-size: 2vh";
    this.isMessage = true;
  }

  showBarChart() {
    this.api.getResultsFermee(this.id_questionnary, this.numQuestion).subscribe(
      (result: any) => {
        this.dataSourceTableau = [];
        this.sumDataSourceTableau =0;
        for (let i = 0; i < (result.values).length; i++) {
          this.sumDataSourceTableau += result.values[i];
        }
        for (let i = 0; i < (result.values).length; i++) {
          this.dataSourceTableau.push({ "label": result.labels[i], "value": result.values[i], "percentage": result.values[i]/this.sumDataSourceTableau })
        }
        this.data = result;

        this.isMessage = false;
        this.isTableau = true;
        this.isBarChart = true;
        this.isPieChart = false;
        this.isScatterChart = false;
        this.isLineChart = false;

      });
  }

  showPieChart() {
    this.api.getResultsFermee(this.id_questionnary, this.numQuestion).subscribe(
      (result: any) => {
        this.dataSourceTableau = [];
        this.sumDataSourceTableau =0;
        for (let i = 0; i < (result.values).length; i++) {
          this.sumDataSourceTableau += result.values[i];
        }
        for (let i = 0; i < (result.values).length; i++) {
          this.dataSourceTableau.push({ "label": result.labels[i], "value": result.values[i], "percentage": result.values[i]/this.sumDataSourceTableau })
        }
        this.isMessage = false;
        this.isTableau = true;
        this.isBarChart = false;
        this.isPieChart = true;
        this.isScatterChart = false;
        this.isLineChart = false;
      });
  }
  showScatterChart() {
    this.api.getResultsFermee(this.id_questionnary, this.numQuestion).subscribe(
      (result: any) => {
        this.dataSourceTableau = [];
        this.sumDataSourceTableau =0;
        for (let i = 0; i < (result.values).length; i++) {
          this.sumDataSourceTableau += result.values[i];
        }
        for (let i = 0; i < (result.values).length; i++) {
          this.dataSourceTableau.push({ "label": result.labels[i], "value": result.values[i], "percentage": result.values[i]/this.sumDataSourceTableau })
        }


        this.isMessage = false;
        this.isTableau = true;
        this.isBarChart = false;
        this.isPieChart = false;
        this.isScatterChart = true;
        this.isLineChart = false;
      });
  }

  showLineChart() {
    this.api.getResultsFermee(this.id_questionnary, this.numQuestion).subscribe(
      (result: any) => {
        this.dataSourceTableau = [];
        this.sumDataSourceTableau =0;
        for (let i = 0; i < (result.values).length; i++) {
          this.sumDataSourceTableau += result.values[i];
        }
        for (let i = 0; i < (result.values).length; i++) {
          this.dataSourceTableau.push({ "label": result.labels[i], "value": result.values[i], "percentage": result.values[i]/this.sumDataSourceTableau })
        }


        this.isMessage = false;
        this.isTableau = true;
        this.isBarChart = false;
        this.isPieChart = false;
        this.isScatterChart = false;
        this.isLineChart = true;
      });
  }

  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}
