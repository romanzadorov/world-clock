import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SearchComponent } from "./search/search.component";

import { trigger, transition, animate, style } from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("800ms", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("800ms", style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "clock-project";
  keyUpSubscription: Subscription;
  countries: any;
  faPlus = faPlus;
  cities: Array<Object> = [];
  dialogRef: any;
  isEdit = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    const savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities && savedCities.length) {
      this.cities = savedCities;
    }
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.keyUpSubscription.unsubscribe();
  }

  add() {
    this.isEdit = false;
    this.dialogRef = this.dialog.open(SearchComponent, {
      width: "600px",
      minHeight: "500px",
      disableClose: true,
      panelClass: "custom-modalbox",
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const selectedCity = this.dialogRef.componentInstance.selectedCity;
        this.cities.push(selectedCity);
        localStorage.setItem("cities", JSON.stringify(this.cities));
      }
    });
  }

  action(action) {
    if (action === "edit") {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  delete(city) {
    const citiesArr = Object.assign([], this.cities);
    this.cities = citiesArr.filter((ct) => ct["capital"] !== city["capital"]);
    localStorage.setItem("cities", JSON.stringify(this.cities));
  }

  getTimerEvent(event) {
    if (event) {
      console.log(event);
    }
  }
}
