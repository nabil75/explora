import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from '../api/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitterService } from '../services/event-emitter.service';

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
  providers: [ApiService]
})

export class MyQuestionnaryComponent implements OnInit{
  displayedColumns = ['position', 'intitule', 'date', 'actions'];
  dataSource!: MatTableDataSource<Questionnary>;
  questionnaries!: any;
  idRow!: any;
  status : any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private api: ApiService,
              private eventEmitter: EventEmitterService) {  }

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
    // this.ngOnInit();
    this.ngAfterViewInit()
    // this.getQuestionnaries();

  }

  editRow (idRow: string) {
    this.eventEmitter.onFirstComponentRowClick(idRow);
  }
}

