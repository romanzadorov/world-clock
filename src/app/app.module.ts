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

@NgModule({
  declarations: [
    AppComponent,
    CanvasClockComponent,
    DigitalClockComponent,
    DigitalClockMomentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MomentModule, HttpClientModule],
  providers: [AppService, { provide: APP_BASE_HREF, useValue: "/" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
