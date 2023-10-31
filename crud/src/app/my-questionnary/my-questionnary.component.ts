import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgClass, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';


/**
 * @title Data table with sorting, pagination, and filtering.
 */

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
    imports: [MatTableModule, MatSortModule, RouterLink, NgClass, MatPaginatorModule, DatePipe]
})

export class MyQuestionnaryComponent implements OnInit{
  displayedColumns = ['position', 'intitule', 'date', 'actions'];
  dataSource!: MatTableDataSource<Questionnary>;
  questionnaries!: any;
  idRow!: any;
  status : string ="Mes questionnaires";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private api: ApiService ) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.getQuestionnaries();
  }

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

