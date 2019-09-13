import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssessmentPage } from './new-assessment.page';

describe('NewAssessmentPage', () => {
  let component: NewAssessmentPage;
  let fixture: ComponentFixture<NewAssessmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssessmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssessmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
