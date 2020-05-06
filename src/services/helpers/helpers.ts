import { NgModule, Injectable } from "@angular/core";

@NgModule()
@Injectable()
export class Helpers {

  constructor() {}

  formatDate(date) {
  console.log('hi');
    return new Date(date)
      .toISOString()
      .slice(0,10);
  }

  public threadMap: any = {
    "1": "Technology Maturity",
    "2": "Technology & Industrial Base",
    "3": "Design",
    "4": "Cost & Funding",
    "5": "Materials",
    "6": "Process Capability & Control",
    "7": "Quality Management",
    "8": "Mfg Personnel",
    "9": "Facilities",
    "10": "Mfg Management"

  };

  public threadMap2016: any = {
    "1": "Technology Maturity",
    "2": "A. Technology & Industrial Base",
    "3": "B. Design",
    "4": "C. Cost & Funding",
    "5": "D. Materials",
    "6": "E. Process Capability & Control",
    "7": "F. Quality Management",
    "8": "G. Mfg Personnel",
    "9": "H. Facilities",
    "10": "I. Mfg Management"
  };

}
