import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatePage } from './navigate.page';

describe('NavigatePage', () => {
  let component: NavigatePage;
  let fixture: ComponentFixture<NavigatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
