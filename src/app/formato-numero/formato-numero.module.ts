import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatoNumeroComponent } from './formato-numero.component';
import { DlgModifyComponent } from './components/dlg-modify/dlg-modify.component';
import { SharedModule } from '../shared/shared.module';
import { FormatRoutingModule } from './formato-routing.module';

@NgModule({
  declarations: [
    FormatoNumeroComponent,
    DlgModifyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormatRoutingModule
  ],
})
export class FormatoNumeroModule { }
