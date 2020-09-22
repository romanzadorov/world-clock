import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  Observable,
  BehaviorSubject,
  Subscription,
  fromEvent,
  throwError,
} from "rxjs";
import {
  switchMap,
  map,
  debounceTime,
  mergeAll,
  catchError,
  distinctUntilChanged,
} from "rxjs/operators";
import { AppService } from "./app.service";
import { MatDialog } from "@angular/material/dialog";
import { faCoffee, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SearchComponent } from "./search/search.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild("filter", { static: false }) filter: ElementRef;
  title = "clock-project";
  keyUpSubscription: Subscription;
  countries: any;
  faPlus = faPlus;
  cities: Array<Object> = [];

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit() {
    // this.getAllCountriesData();
    // this.appService.coutriesEvent.subscribe((evt) => {
    //   this.countries = evt;
    //   console.log(this.countries);
    // });
  }

  ngAfterViewInit() {
    // this.keyUpSubscription = fromEvent(this.filter.nativeElement, "keyup")
    //   .pipe(
    //     debounceTime(500),
    //     map((event: Event) => (<HTMLInputElement>event.target).value),
    //     distinctUntilChanged(),
    //     switchMap((value) => this.appService.searchCountries(value)),
    //     mergeAll(),
    //     catchError((err) => {
    //       console.log("Handling error locally and rethrowing it...", err);
    //       return throwError(err);
    //     })
    //   )
    //   .subscribe(
    //     (data) => {
    //       console.log("data", data);
    //       this.countries = [];
    //       // this.countries = data;
    //       this.countries.push(data);
    //     },
    //     (error) => {
    //       console.log("error", error);
    //     },
    //     () => console.log("HTTP request completed.")
    //   );
  }

  ngOnDestroy() {
    this.keyUpSubscription.unsubscribe();
  }

  // getAllCountriesData() {
  //   this.appService.getAllCountries().subscribe((res: Array<Object>) => {
  //     console.log(res);
  //     this.appService.countries = res;
  //   });
  // }

  add() {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: "600px",
      // height: "auto",
      // maxHeight: 150,
      minHeight: "500px",
      disableClose: true,
    });
    // dialogRef.componentInstance.assignValues = {firmName: {value: this.searchedFirm}};
    dialogRef.afterClosed().subscribe((result) => {
      const selectedCity = dialogRef.componentInstance.selectedCity;
      // console.log(dialogRef.componentInstance.selectedCity);

      console.log(selectedCity);
      this.cities.push(selectedCity);

      console.log(this.cities);

      // this.selectedFirm = result;
      // this.addNewPhaseAward();
    });
  }
}
