import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AssessmentScopePopoverComponent } from "./assessment-scope-popover.component";

describe("AssessmentScopePopoverComponent", () => {
  let component: AssessmentScopePopoverComponent;
  let fixture: ComponentFixture<AssessmentScopePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentScopePopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentScopePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
