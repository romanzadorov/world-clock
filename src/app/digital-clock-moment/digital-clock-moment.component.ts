import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import * as moment from "moment";
import { AppService } from "../app.service";

@Component({
  selector: "app-digital-clock-moment",
  templateUrl: "./digital-clock-moment.component.html",
  styleUrls: ["./digital-clock-moment.component.scss"],
})
export class DigitalClockMomentComponent implements OnInit, AfterViewInit {
  clock: any;
  clockMin: any;
  utc: any;
  @Input() time: any;
  @Input() city: Object;
  flagUrl: string;
  @Input() isEdit: boolean;
  @Output() isTimerOn = new EventEmitter();
  @Input() innerWidth: Number;

  constructor(
    public appService: AppService,
    public changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.flagUrl = this.city["flag"];
    const utcInput = this.getUTCinput();
    console.log(utcInput);
    console.log(this.innerWidth);

    setInterval(() => {
      this.clock = moment()
        .utc()
        .add(utcInput, "hours")
        .format("dddd, MMMM Do YYYY, h:mm:ss a")
        .toUpperCase();

      this.clockMin = moment()
        .utc()
        .add(utcInput, "hours")
        .format("h:mm a")
        .toUpperCase();
    }, 1000);
  }

  ngAfterViewInit() {}

  getUTCinput() {
    let utcInput;
    // let utc;

    switch (this.city["capital"]) {
      case "Washington, D.C.":
        this.utc = this.city["timezones"][8] as string;
        break;

      default:
        this.utc = this.city["timezones"][0] as string;
        break;
    }
    const utcValue = this.utc.split("UTC")[1];
    const operator = utcValue[0];
    const hours = utcValue.slice(1, 3);
    const minutes = utcValue.slice(4, 6);
    let hoursValue = "";
    let minutesValue = "";
    if (hours) {
      if (hours[0] === "0") {
        hoursValue = hours.split("")[1].toString();
      } else {
        hoursValue = hours;
      }
    }

    if (minutes) {
      switch (minutes) {
        case "00":
          minutesValue = "0";
          break;
        case "30":
          minutesValue = "5";
          break;
        case "45":
          minutesValue = "75";
          break;
      }
    }

    const hoursMinutes = `${operator}${hoursValue}.${minutesValue}`;
    utcInput = Number(hoursMinutes);
    this.clock = moment()
      .utc()
      .add(utcInput, "hours")
      .format("dddd, MMMM Do YYYY, h:mm:ss a")
      .toUpperCase();
    return utcInput;
  }
}
