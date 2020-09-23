import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-country-flag",
  templateUrl: "./country-flag.component.html",
  styleUrls: ["./country-flag.component.scss"],
})
export class CountryFlagComponent implements OnInit {
  @Input() city: Object;
  flagUrl: string;

  constructor() {}

  ngOnInit() {
    this.flagUrl = this.city["flag"];
  }
}
