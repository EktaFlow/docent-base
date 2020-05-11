import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssessmentPage } from './edit-assessment.page';

describe('EditAssessmentPage', () => {
  let component: EditAssessmentPage;
  let fixture: ComponentFixture<EditAssessmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssessmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssessmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
