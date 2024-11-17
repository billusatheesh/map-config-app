import { TestBed } from '@angular/core/testing';

import { MapsettingsRootService } from './mapsettings-root.service';

describe('MapsettingsRootService', () => {
  let service: MapsettingsRootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsettingsRootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
