import { Injectable } from "@angular/core";

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

}
