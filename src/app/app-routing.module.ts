import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentWrapperComponent } from "./content-wrapper/content-wrapper.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "world-clock",
    pathMatch: "full",
  },
  {
    path: "world-clock",
    component: ContentWrapperComponent,
    data: { title: "World Clock" },
  },
  { path: "**", redirectTo: "/world-clock", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
