import { TestBed } from '@angular/core/testing';

import { TranslatorSettingsService } from './translator-settings.service';

describe('TranslatorSettingsService', () => {
  let service: TranslatorSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatorSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
