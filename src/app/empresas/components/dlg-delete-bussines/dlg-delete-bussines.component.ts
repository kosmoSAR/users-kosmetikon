import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, lastValueFrom } from 'rxjs';
import { Pictures } from 'src/app/interfaces/picture.interfaces';
import { DlgDeletePictureComponent } from 'src/app/pictures-module/components/dlg-delete/dlg-delete.component';
import { PictureService } from 'src/app/pictures-module/services/picture.service';
import { BussinesService } from '../../services/bussines.service';
import { UsersBusinessService } from '../../services/users-business.service';

@Component({
  selector: 'app-dlg-delete-bussines',
  templateUrl: './dlg-delete-bussines.component.html',
  styleUrls: ['./dlg-delete-bussines.component.css']
})
export class DlgDeleteBussinesComponent {

  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _businessService: BussinesService, private _userService: UsersBusinessService
    ,public dialogRef: MatDialogRef<DlgDeleteBussinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
      console.log(data);

    }

  ngOnDestroy(): void {
    this.notifier$.next(true);
		this.notifier$.complete();
  }

  deleteUser(){
      if (this.data.tipo === "business") {
        this._businessService.deleteBusiness(this.data.bussines.id);
        this.dialogRef.close(this.data.bussines.id);
      }

      if(this.data.tipo === "user"){
        this._userService.deleteUser(this.data.bussines.id)
        this._userService.filterUsers(this.data.bussines.idBusiness)
        this.dialogRef.close();
      }
  }

  closedlg(){
    this.dialogRef.close( 'null' )
  }

}
