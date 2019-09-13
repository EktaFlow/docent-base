import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcronymsPage } from './acronyms.page';

describe('AcronymsPage', () => {
  let component: AcronymsPage;
  let fixture: ComponentFixture<AcronymsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcronymsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcronymsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
