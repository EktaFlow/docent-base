import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaPage } from './criteria.page';

describe('CriteriaPage', () => {
  let component: CriteriaPage;
  let fixture: ComponentFixture<CriteriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
