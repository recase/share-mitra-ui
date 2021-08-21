import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrtfolioComponent } from './add-prtfolio.component';

describe('AddPrtfolioComponent', () => {
  let component: AddPrtfolioComponent;
  let fixture: ComponentFixture<AddPrtfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrtfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrtfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
