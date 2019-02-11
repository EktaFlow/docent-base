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

}
