import { Component, OnInit } from "@angular/core";

@Component({
  selector: "legend-popover",
  templateUrl: "./legend-popover.component.html",
  styleUrls: ["./legend-popover.component.scss"],
})
export class LegendPopoverComponent implements OnInit {
  text: string;

  constructor() {
    this.text = "Hello World";
  }

  ngOnInit() {}
}
