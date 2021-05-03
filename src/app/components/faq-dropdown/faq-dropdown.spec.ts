import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FaqDropdownComponent } from "./faq-dropdown.component";

describe("FaqDropdownComponent", () => {
  let component: FaqDropdownComponent;
  let fixture: ComponentFixture<FaqDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqDropdownComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
