import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuiteRunComponent } from './test-suite-run.component';

describe('TestSuiteRunComponent', () => {
  let component: TestSuiteRunComponent;
  let fixture: ComponentFixture<TestSuiteRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestSuiteRunComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSuiteRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
