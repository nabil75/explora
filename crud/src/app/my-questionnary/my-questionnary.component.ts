import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgClass, DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';



export interface Questionnary {
  position: string;
  intitulé: string;
  date: string;
  actions: string;
}

@Component({
    selector: 'app-my-questionnary',
    templateUrl: './my-questionnary.component.html',
    styleUrls: ['./my-questionnary.component.css'],
    standalone: true,
    imports: [MatTableModule, MatSortModule, RouterLink, NgClass, MatPaginatorModule, DatePipe, NgIf, TranslateModule]
})

export class MyQuestionnaryComponent implements OnInit{
  displayedColumns = ['position', 'intitule', 'date', 'actions'];
  dataSource!: MatTableDataSource<Questionnary>;
  questionnaries!: any;
  idRow!: any;
  status!: string;
  showImage: boolean=true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  currentLanguage!:string;

  constructor(private api: ApiService,
              public sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private translate: TranslateService,
              ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('titre');
    if(id != null){
      this.translate.get('my_questionnary.choose_questionnary').subscribe( (text: string) => {
        this.status = text;
      });
      this.showImage=false;
    }else{
      this.translate.get('my_questionnary.my_questionnaries').subscribe( (text: string) => {
        this.status = text;
      });
      this.showImage=true;
    }
  }

  ngAfterViewInit() {
    this.getQuestionnaries();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const id = this.route.snapshot.paramMap.get('titre');
      if(id != null){
        this.translate.get('my_questionnary.choose_questionnary').subscribe( (text: string) => {
          this.status = text;
        });
        this.showImage=false;
      }else{
        this.translate.get('my_questionnary.my_questionnaries').subscribe( (text: string) => {
          this.status = text;
        });
        this.showImage=true;
      }
    });
  }

  // ngOnChanges(){
  //   console.log("langue courante : "+this.translate.getDefaultLang());
  // }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getQuestionnaries = () => {
    this.api.getAllQuestionnary().subscribe(
      (data) => {
        this.questionnaries = data;
        this.dataSource = new MatTableDataSource(this.questionnaries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  deleteRow(idRow: string){
    this.api.deleteQuestionnary(idRow);
    this.ngAfterViewInit();
  }

}

