import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysPriceComponent } from './todays-price.component';

describe('TodaysPriceComponent', () => {
  let component: TodaysPriceComponent;
  let fixture: ComponentFixture<TodaysPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
