import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MobileNavPopoverComponent } from "./mobile-nav-popover.component";

describe("MobileNavPopoverComponent", () => {
  let component: MobileNavPopoverComponent;
  let fixture: ComponentFixture<MobileNavPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileNavPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileNavPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
