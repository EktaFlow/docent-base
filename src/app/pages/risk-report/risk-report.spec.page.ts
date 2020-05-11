import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskReportPage } from './risk-report.page';

describe('RiskReportPage', () => {
  let component: RiskReportPage;
  let fixture: ComponentFixture<RiskReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
