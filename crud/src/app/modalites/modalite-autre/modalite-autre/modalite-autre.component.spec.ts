import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaliteAutreComponent } from './modalite-autre.component';

describe('ModaliteAutreComponent', () => {
  let component: ModaliteAutreComponent;
  let fixture: ComponentFixture<ModaliteAutreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModaliteAutreComponent]
    });
    fixture = TestBed.createComponent(ModaliteAutreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
