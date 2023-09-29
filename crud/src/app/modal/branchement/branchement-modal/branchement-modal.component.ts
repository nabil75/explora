import { Component, Input, OnInit, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-branchement-modal',
  templateUrl: './branchement-modal.component.html',
  styleUrls: ['./branchement-modal.component.css']
})
export class BranchementModalComponent implements OnInit {

  showModal: boolean = false;

  @Input() titre = "";
  @Input() modalites: ComponentRef<any>[]=[] ;
  @Input()
  compId!: string;
  @Input() questions: any;


  constructor() {

   }

  ngOnInit(): void {
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
