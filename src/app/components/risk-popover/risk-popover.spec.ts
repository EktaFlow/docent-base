import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RiskPopoverComponent } from "./risk-popover.component";

describe("RiskPopoverComponent", () => {
  let component: RiskPopoverComponent;
  let fixture: ComponentFixture<RiskPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RiskPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
