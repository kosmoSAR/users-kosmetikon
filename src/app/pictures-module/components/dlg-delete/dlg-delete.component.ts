import { Pictures } from './../../../interfaces/picture.interfaces';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PictureService } from '../../services/picture.service';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dlg-delete',
  templateUrl: './dlg-delete.component.html',
  styleUrls: ['./dlg-delete.component.css']
})
export class DlgDeletePictureComponent implements OnDestroy {

  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _pictureService:PictureService, public dialogRef: MatDialogRef<DlgDeletePictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pictures ) {}

  ngOnDestroy(): void {
    this.notifier$.next(true);
		this.notifier$.complete();
  }

  async deleteUser(){
    try{
      const pictureId = { "ID_IMAGEN":this.data.ID_IMAGEN }
      const observable2$ = this._pictureService.deletePictures(pictureId).pipe(
        takeUntil(this.notifier$)
      )
      const resultado2 = await lastValueFrom(observable2$);
      console.log(resultado2);

      const observable3$ = this._pictureService.getPictures().pipe(
        takeUntil(this.notifier$)
      );
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
