import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormatoNumeroComponent } from "./formato-numero.component";

const routes: Routes = [
  { path:'', component: FormatoNumeroComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FormatRoutingModule { }
