import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddTeamMembersPopOverComponent } from "./add-team-members-pop-over.component";

describe("AddTeamMembersPopOverComponent", () => {
  let component: AddTeamMembersPopOverComponent;
  let fixture: ComponentFixture<AddTeamMembersPopOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeamMembersPopOverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamMembersPopOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
