import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaliteNspComponent } from './modalite-nsp.component';

describe('ModaliteNspComponent', () => {
  let component: ModaliteNspComponent;
  let fixture: ComponentFixture<ModaliteNspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ModaliteNspComponent]
});
    fixture = TestBed.createComponent(ModaliteNspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
