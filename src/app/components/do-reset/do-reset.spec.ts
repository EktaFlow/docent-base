import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoResetComponent } from './do-reset.component';

describe('DoResetComponent', () => {
  let component: DoResetComponent;
  let fixture: ComponentFixture<DoResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoResetComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
