import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistModalComponent } from './watchlist-modal.component';

describe('WatchlistComponent', () => {
  let component: WatchlistModalComponent;
  let fixture: ComponentFixture<WatchlistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchlistModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
