import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { fromEvent, Subscription, throwError } from "rxjs";
import {
  switchMap,
  map,
  debounceTime,
  mergeAll,
  catchError,
  distinctUntilChanged,
} from "rxjs/operators";
import { AppService } from "../app.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  @ViewChild("filter", { static: false }) filter: ElementRef;
  keyUpSubscription: Subscription;
  countries: any;
  allCountries: Array<Object>;
  // selectedCities: Array<Object>;
  selectedCity: Object;

  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.getAllCountriesData();
    this.appService.coutriesEvent.subscribe((evt) => {
      this.countries = evt;
      console.log(this.countries);
    });
  }

  ngAfterViewInit() {
    this.keyUpSubscription = fromEvent(this.filter.nativeElement, "keyup")
      .pipe(
        debounceTime(500),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        switchMap((value) => this.appService.searchCountries(value)),
        mergeAll(),
        catchError((err) => {
          console.log("Handling error locally and rethrowing it...", err);
          return throwError(err);
        })
      )
      .subscribe(
        (data) => {
          console.log("data", data);
          this.countries = [];
          // this.countries = data;
          this.countries.push(data);
          localStorage.setItem("cities", JSON.stringify(this.countries));
        },
        (error) => {
          console.log("error", error);
        },
        () => console.log("HTTP request completed.")
      );
  }

  getAllCountriesData() {
    this.appService.getAllCountries().subscribe((res: Array<Object>) => {
      // console.log(res);
      // this.appService.countries = res;
      this.allCountries = res;
      this.countries = res;
      localStorage.setItem("allCountries", JSON.stringify(this.allCountries));
    });
  }

  close(event) {
    if (event === "cancel") {
      this.dialogRef.close();
    } else {
      this.selectedCity = event;
      this.dialogRef.close(event);
    }
  }
}
