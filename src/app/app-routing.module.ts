import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "world-clock",
    pathMatch: "full",
  },
  {
    path: "world-clock",
    component: AppComponent,
    data: { title: "World Clock" },
  },
  { path: "**", redirectTo: "/world-clock", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
