import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardPage } from './user-dashboard.page';

describe('UserDashboardPage', () => {
  let component: UserDashboardPage;
  let fixture: ComponentFixture<UserDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
