import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultCompareComponent } from './test-result-compare.component';

describe('TestResultCompareComponent', () => {
  let component: TestResultCompareComponent;
  let fixture: ComponentFixture<TestResultCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestResultCompareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestResultCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
