import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  worldtimeapiBaseUrl = environment.worldtimeapiBaseUrl;
  restCountriesBaseUrl = environment.restCountriesBaseUrl;
  countries: any;
  coutriesEvent: EventEmitter<any> = new EventEmitter();

  timeObservable: Subject<any> = new Subject();

  constructor(private readonly http: HttpClient) {}

  getListOfLocations(continent: any) {
    const url = `${this.worldtimeapiBaseUrl}/${continent}`;
    return this.http.get(url);
  }

  getLocationDetails(continent: any, selectedLocation: any) {
    console.log("continent", continent);
    console.log("selectedLocation", selectedLocation);
    const url = `${this.worldtimeapiBaseUrl}/${continent}/${selectedLocation}`;
    return this.http.get(url);
  }

  getAllCountries() {
    const url = `${this.restCountriesBaseUrl}/all`;
    return this.http.get(url);
  }

  searchCountries(searchText: string): Observable<Object> {
    console.log("searchText", searchText);
    if (searchText && searchText !== "") {
      const searchValue = searchText.toLowerCase().trim();

      console.log(searchValue);

      // const url = `${this.restCountriesBaseUrl}/name/${searchValue}`;
      // capital:
      const url = `${this.restCountriesBaseUrl}/capital/${searchValue}`;

      // let filteredResult;
      // filteredResult = this.countries.filter((countryObj) => {
      //   console.log(countryObj);
      //   console.log(countryObj.capital.toLowerCase().includes(searchValue));
      //   return countryObj.capital.toLowerCase().includes(searchValue);
      // });

      // console.log(filteredResult);
      // return filteredResult as Observable<Object[]>;

      return this.http.get(url);
    } else {
      // if search value is not provided, make the countrie array empty
      this.coutriesEvent.emit([]);
      console.log("No search value was provided");
      return of([]);
    }
  }
}
