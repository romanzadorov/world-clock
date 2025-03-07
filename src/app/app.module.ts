import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CanvasClockComponent } from "./canvas-clock/canvas-clock.component";
import { DigitalClockComponent } from "./digital-clock/digital-clock.component";
import { DigitalClockMomentComponent } from "./digital-clock-moment/digital-clock-moment.component";
import { MomentModule } from "ngx-moment";
import { AppService } from "./app.service";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { SearchComponent } from "./search/search.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CountryFlagComponent } from "./country-flag/country-flag.component";
import { FooterComponent } from "./footer/footer.component";
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasClockComponent,
    DigitalClockComponent,
    DigitalClockMomentComponent,
    SearchComponent,
    CountryFlagComponent,
    FooterComponent,
    ContentWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MomentModule,
    HttpClientModule,
    MatDialogModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [SearchComponent],
  providers: [AppService, { provide: APP_BASE_HREF, useValue: "/" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
