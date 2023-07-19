import { Pictures } from './../../../interfaces/picture.interfaces';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PictureService } from '../../services/picture.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dlg-delete',
  templateUrl: './dlg-delete.component.html',
  styleUrls: ['./dlg-delete.component.css']
})
export class DlgDeletePictureComponent {

  constructor(private _pictureService:PictureService, public dialogRef: MatDialogRef<DlgDeletePictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pictures ) {

    }

  async deleteUser(){
    try{
      const pictureId = { "ID_IMAGEN":this.data.ID_IMAGEN }
      console.log(pictureId);


      const observable2$ = this._pictureService.deletePictures(pictureId)
      const resultado2 = await lastValueFrom(observable2$);
      console.log(resultado2);

      const observable3$ = this._pictureService.getPictures();
      const resultado3 = await lastValueFrom(observable3$);

      this.dialogRef.close( resultado3 )
    } catch (error) {
      console.log(error);
    }
  }

  closedlg(){
    this.dialogRef.close( 'null' )
  }

}
