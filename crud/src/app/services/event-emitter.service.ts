import { ComponentRef, EventEmitter, Injectable, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModaliteAutreComponent } from '../modalites/modalite-autre/modalite-autre/modalite-autre.component';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {


  invokeFirstComponentFunction = new EventEmitter();
  invokeGetIdRowFunction = new EventEmitter();
  subsVar!: Subscription;

  constructor() { }

  onFirstComponentQuestionClick(idQuestion: number) {
    this.invokeFirstComponentFunction.emit(idQuestion);
  }
  onFirstComponentModaliteClick(idModalite: number) {
    this.invokeFirstComponentFunction.emit(idModalite);
  }
  onFirstComponentRowClick(idRow: string) {
    this.invokeGetIdRowFunction.emit(idRow);
  }
}
