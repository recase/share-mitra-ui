import { TestBed } from '@angular/core/testing';

import { KeyFormattingService } from './key-formatting.service';

describe('KeyFormattingService', () => {
  let service: KeyFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
