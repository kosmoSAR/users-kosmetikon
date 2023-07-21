import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, lastValueFrom } from 'rxjs';
import { Pictures } from 'src/app/interfaces/picture.interfaces';
import { DlgDeletePictureComponent } from 'src/app/pictures-module/components/dlg-delete/dlg-delete.component';
import { PictureService } from 'src/app/pictures-module/services/picture.service';

@Component({
  selector: 'app-dlg-delete-bussines',
  templateUrl: './dlg-delete-bussines.component.html',
  styleUrls: ['./dlg-delete-bussines.component.css']
})
export class DlgDeleteBussinesComponent {

  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialogRef: MatDialogRef<DlgDeleteBussinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnDestroy(): void {
    this.notifier$.next(true);
		this.notifier$.complete();
  }

  async deleteUser(){
    try{
      console.log(this.data);
      if (this.data.tipo === "bussines") {
        const pictureId = { "id":this.data.bussines.id}
        this.dialogRef.close(pictureId)
      }

      if (this.data.tipo === "usuario") {
        const pictureId = { "id":this.data.user.id}
        this.dialogRef.close(pictureId)
      }
    } catch (error) {
      console.log(error);
    }
  }

  closedlg(){
    this.dialogRef.close( 'null' )
  }

}
