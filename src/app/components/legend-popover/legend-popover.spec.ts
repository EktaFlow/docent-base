import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LegendPopoverComponent } from "./legend-popover.component";

describe("LegendPopoverComponent", () => {
  let component: LegendPopoverComponent;
  let fixture: ComponentFixture<LegendPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LegendPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
