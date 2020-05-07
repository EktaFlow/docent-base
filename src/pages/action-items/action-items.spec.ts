import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionItemsPage } from './action-items.page';

describe('ActionItemsPage', () => {
  let component: ActionItemsPage;
  let fixture: ComponentFixture<ActionItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionItemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
