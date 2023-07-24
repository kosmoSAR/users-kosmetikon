import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BussinesService } from '../../services/bussines.service';
import { UsersBusinessService } from '../../services/users-business.service';

@Component({
  selector: 'dlg-edit-bussines',
  templateUrl: './dlg-edit-bussines.component.html',
  styleUrls: ['./dlg-edit-bussines.component.css']
})
export class DlgEditBussinesComponent {

  forms!: FormGroup;

  constructor(private fb:FormBuilder ,private _businesServie: BussinesService, private _userService: UsersBusinessService
    ,private dialogRef: MatDialogRef<DlgEditBussinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
      console.log(data);
      if (data.tipo === "bussines") {
        this.forms = this.fb.group({
          nombre:[data.business.name, Validators.required],
          phone:[data.business.phone, Validators.required]
        })
      }
      if (data.tipo === "user") {
        this.forms = this.fb.group({
          nombre:[data.business.name, Validators.required],
          phone:[data.business.phone, Validators.required]
        })
      }
    }

    updateInfo(){
      const info:any = {
        id: this.data.business.id,
        name: this.forms.value.nombre,
        phone: this.forms.value.phone
      }

      if (this.data.tipo === "bussines") {
        this._businesServie.editBusiness(info)
        this.dialogRef.close()
      }

      if (this.data.tipo === "user") {
        this._userService.editUser( info )
        this.dialogRef.close()
      }
    }

}
