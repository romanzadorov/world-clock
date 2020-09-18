import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
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
  @Input() time: any;

  constructor(
    public appService: AppService,
    public changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // console.log(this.clock);
    this.appService.timeObservable.asObservable().subscribe((time) => {
      console.log(time);
      this.clock = time;
      this.changeDetection.detectChanges();
    });
  }

  ngAfterViewInit() {}
}
