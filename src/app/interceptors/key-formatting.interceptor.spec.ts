import { TestBed } from '@angular/core/testing';

import { KeyFormattingInterceptor } from './key-formatting.interceptor';

describe('KeyFormattingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      KeyFormattingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: KeyFormattingInterceptor = TestBed.inject(KeyFormattingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
