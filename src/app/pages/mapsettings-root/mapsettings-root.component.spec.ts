import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsettingsRootComponent } from './mapsettings-root.component';

describe('MapsettingsRootComponent', () => {
  let component: MapsettingsRootComponent;
  let fixture: ComponentFixture<MapsettingsRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapsettingsRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapsettingsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
