import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaliteNcComponent } from './modalite-nc.component';

describe('ModaliteNcComponent', () => {
  let component: ModaliteNcComponent;
  let fixture: ComponentFixture<ModaliteNcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModaliteNcComponent]
    });
    fixture = TestBed.createComponent(ModaliteNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
