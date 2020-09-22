import { Moment } from "moment";

/**
 * Easily Destructure Date Object
 */
export class TDate {
  constructor(readonly date: Date, readonly momentDate: Moment) {}

  get momentSeconds(): number {
    return this.momentDate.seconds();
  }

  get momentMinutes(): number {
    return this.momentDate.minutes();
  }

  get momentHours(): number {
    return this.momentDate.hours();
  }

  get seconds(): number {
    return this.date.getSeconds();
  }

  get minutes(): number {
    return this.date.getMinutes();
  }

  get hours(): number {
    return this.date.getHours();
  }

  get month(): number {
    return this.date.getMonth() + 1;
  }

  get day(): number {
    return this.date.getDate();
  }

  get year(): number {
    return this.date.getFullYear();
  }
}
