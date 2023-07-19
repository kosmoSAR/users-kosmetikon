import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { PicturesModuleComponent } from './pictures-module.component';

//modules
import { PicturesRoutingModule } from './pictures-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PictureListComponent } from './components/picture-list/picture-list.component';
import { DlgAddComponent } from './components/dlg-add/dlg-add.component';
import { DlgDeletePictureComponent } from './components/dlg-delete/dlg-delete.component';


@NgModule({
  declarations: [
    PicturesModuleComponent,
    PictureListComponent,
    DlgAddComponent,
    DlgDeletePictureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PicturesRoutingModule,
  ]
})

export class PicturesModuleModule { }
