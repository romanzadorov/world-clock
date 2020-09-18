import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  worldtimeapiBaseUrl = environment.worldtimeapiBaseUrl;
  timeObservable: Subject<any> = new Subject();

  constructor(private readonly http: HttpClient) {}

  getListOfLocations(continent: any) {
    const url = `${this.worldtimeapiBaseUrl}/${continent}`;
    return this.http.get(url);
  }

  getLocationDetails(continent: any, selectedLocation: any) {
    const url = `${this.worldtimeapiBaseUrl}/${continent}/${selectedLocation}`;
    return this.http.get(url);
  }
}
