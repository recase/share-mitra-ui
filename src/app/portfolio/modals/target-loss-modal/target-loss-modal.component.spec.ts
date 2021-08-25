import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetLossModalComponent } from './target-loss-modal.component';

describe('TargetLossModalComponent', () => {
  let component: TargetLossModalComponent;
  let fixture: ComponentFixture<TargetLossModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetLossModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetLossModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
