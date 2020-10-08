import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { of, Subject, Subscription } from "rxjs";
import {
  map,
  debounceTime,
  catchError,
  distinctUntilChanged,
  mergeMap,
} from "rxjs/operators";
import { AppService } from "../app.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild("filter", { static: false }) filter: ElementRef;
  keyUpSubscription: Subscription;
  countries: any;
  allCountries: Array<Object>;
  selectedCity: Object;
  isNotFound = false;

  public keyUp = new Subject<KeyboardEvent>();

  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.getAllCountriesData();
  }

  ngOnDestroy(): void {
    this.keyUpSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.keyUpSubscription = this.keyUp
      .pipe(
        map((event) => event.target["value"]),
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap((search) =>
          this.appService.searchCountries(search).pipe(
            catchError((err) => {
              console.log("Handling error locally and rethrowing it...", err);
              this.isNotFound = true;
              return of({ results: null });
            })
          )
        )
      )
      .subscribe(
        (data) => {
          console.log(data);

          if (data && Array.isArray(data)) {
            this.countries = [];
            this.countries.push(data[0]);
            localStorage.setItem("cities", JSON.stringify(this.countries));
          }
          if (data["results"] === null) {
            console.log("no search results");
          }
          if (data === "noValueEntered") {
            console.log("No Value Entered");
            this.countries = this.allCountries;
            this.isNotFound = false;
          }
        },
        (error) => {
          if (error && error["status"] == 404) {
            console.log("error", error);
            this.isNotFound = true;
          }
        },
        () => console.log("HTTP request completed.")
      );
  }

  getAllCountriesData() {
    this.appService.getAllCountries().subscribe((res: Array<Object>) => {
      // sorting the list of cities by country capital
      this.allCountries = res.sort((a, b) =>
        a["capital"] < b["capital"] ? -1 : a["capital"] > b["capital"] ? 1 : 0
      );
      this.countries = [...this.allCountries];

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
