import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SubthreadPopupComponent } from "./subthread-popup.component";

describe("SubthreadPopupComponent", () => {
  let component: SubthreadPopupComponent;
  let fixture: ComponentFixture<SubthreadPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubthreadPopupComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubthreadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
