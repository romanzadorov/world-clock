import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { countriesJSON } from "../assets/countries";

@Injectable({
  providedIn: "root",
})
export class AppService {
  worldtimeapiBaseUrl = environment.worldtimeapiBaseUrl;
  restCountriesBaseUrl = environment.restCountriesBaseUrl;
  // countries: any;
  coutriesEvent: EventEmitter<any> = new EventEmitter();
  countriesJSON = countriesJSON;

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
    console.log(countriesJSON);

    // return of(countriesJSON);
    return this.http.get(url);
  }

  searchCountries(searchText: string): Observable<Object> {
    if (searchText && searchText !== "") {
      const searchValue = searchText.toLowerCase().trim();
      // capital:
      const url = `${this.restCountriesBaseUrl}/capital/${searchValue}`;
      return this.http.get(url);
    } else {
      return of("noValueEntered");
    }
  }
}
