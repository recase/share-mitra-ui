import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetLossComponent } from './target-loss.component';

describe('TargetLossComponent', () => {
  let component: TargetLossComponent;
  let fixture: ComponentFixture<TargetLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetLossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
