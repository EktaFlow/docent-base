import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { JsonUploadPopoverComponent } from "./json-upload-popover.component";

describe("JsonUploadPopoverComponent", () => {
  let component: JsonUploadPopoverComponent;
  let fixture: ComponentFixture<JsonUploadPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonUploadPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonUploadPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
