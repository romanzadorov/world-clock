import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subscription, timer } from "rxjs";
import { tap } from "rxjs/operators";
import { TDate } from "./TDate";
import { AppService } from "../app.service";
import * as moment from "moment";

@Component({
  selector: "app-canvas-clock",
  templateUrl: "./canvas-clock.component.html",
  styleUrls: ["./canvas-clock.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasClockComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("canvas", { static: false }) canvasRef: ElementRef;
  @Input() public width = 100;
  @Input() public height = 100;
  canvasContext: CanvasRenderingContext2D;
  subscription: Subscription;
  listOfContinents = [
    "Africa",
    "America",
    "Antarctica",
    "Asia",
    "Atlantic",
    "Australia",
    "Europe",
    "Indian",
    "Pacific",
  ];
  selectedLocation: string;
  selectedContinent: string;
  listOfLocations = [];
  listOfLocationsLoaded = false;
  clock: any;

  constructor(
    private ngZone: NgZone,
    public appService: AppService,
    public changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.clock = moment()
        .format("dddd, MMMM Do YYYY, h:mm:ss a")
        .toUpperCase();
      this.appService.timeObservable.next(this.clock);
      console.log(this.clock);
    }, 1000);
  }

  selectContinent(event) {
    if (event.target.value) {
      this.selectedContinent = event.target.value;
      console.log(this.selectedContinent);

      this.getListOfLocations(this.selectedContinent);
    }
  }

  selectLocation(event) {
    if (event.target.value) {
      this.selectedLocation = event.target.value;
      console.log(this.selectedLocation);

      // this.getListOfLocations(this.selectedContinent);
      this.getLocationDetails(this.selectedContinent, this.selectedLocation);
    }
  }

  getLocationDetails(selectedContinent, selectedLocation) {
    this.appService
      .getLocationDetails(selectedContinent, selectedLocation)
      .subscribe((res) => {
        console.log(res);
      });
  }

  //TODO: https://restcountries.eu/rest/v2/all

  getListOfLocations(continent) {
    // this.listOfLocationsLoaded = false;
    this.listOfLocations = [];
    this.appService.getListOfLocations(continent).subscribe((res) => {
      const continents = res as Array<string>;
      continents.forEach((cont) => {
        const countryParts = cont.split("/");

        if (countryParts.length === 2) {
          this.listOfLocations.push(countryParts[1]);
        }
        if (countryParts.length === 3) {
          this.listOfLocations.push(countryParts[2]);
        }
      });
      this.listOfLocationsLoaded = true;
      console.log(this.listOfLocations);
      this.changeDetection.detectChanges();
    });
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    const radius = canvasEl.height / 2;
    const innerRadius = radius * 0.9;
    this.canvasContext = canvasEl.getContext("2d");
    this.canvasContext.translate(radius, radius);

    this.ngZone.runOutsideAngular(() => this.draw(innerRadius));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  draw(innerRadius: number) {
    this.subscription = timer(0, 1000)
      .pipe(
        tap((t) => {
          this.drawFace(this.canvasContext, innerRadius);
          this.drawNumbers(this.canvasContext, innerRadius);
          this.drawTime(this.canvasContext, innerRadius);
        })
      )
      .subscribe();
  }

  drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
    const grad = ctx.createRadialGradient(
      0,
      0,
      radius * 0.95,
      0,
      0,
      radius * 1.05
    );

    grad.addColorStop(0, "white");
    grad.addColorStop(0.5, "#333");
    grad.addColorStop(1, "white");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  drawNumbers(ctx, radius) {
    let ang;
    let num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  drawTime(ctx, radius) {
    const { seconds, minutes, hours } = new TDate(new Date());
    const hourHand =
      ((hours % 12) * Math.PI) / 6 +
      (minutes * Math.PI) / (6 * 60) +
      (seconds * Math.PI) / (360 * 60);
    this.drawHand(ctx, hourHand, radius * 0.5, radius * 0.07);

    const minuteHand =
      (minutes * Math.PI) / 30 + (seconds * Math.PI) / (30 * 60);
    this.drawHand(ctx, minuteHand, radius * 0.8, radius * 0.07);

    const secondHand = (seconds * Math.PI) / 30;
    this.drawHand(ctx, secondHand, radius * 0.9, radius * 0.02);
  }

  drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
