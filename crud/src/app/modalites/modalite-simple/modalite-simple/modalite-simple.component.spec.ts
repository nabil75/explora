import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaliteSimpleComponent } from './modalite-simple.component';

describe('ModaliteSimpleComponent', () => {
  let component: ModaliteSimpleComponent;
  let fixture: ComponentFixture<ModaliteSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ModaliteSimpleComponent]
});
    fixture = TestBed.createComponent(ModaliteSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
