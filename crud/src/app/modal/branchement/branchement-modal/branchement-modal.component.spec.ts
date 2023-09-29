import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchementModalComponent } from './branchement-modal.component';

describe('BranchementModalComponent', () => {
  let component: BranchementModalComponent;
  let fixture: ComponentFixture<BranchementModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchementModalComponent]
    });
    fixture = TestBed.createComponent(BranchementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
