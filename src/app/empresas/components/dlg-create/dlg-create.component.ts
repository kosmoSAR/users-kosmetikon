import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BussinesService } from '../../services/bussines.service';
import { v4 as uuidv4 } from 'uuid';
import { UsersBusinessService } from '../../services/users-business.service';

@Component({
  selector: 'app-dlg-create',
  templateUrl: './dlg-create.component.html',
  styleUrls: ['./dlg-create.component.css']
})
export class DlgCreateComponent {

  forms!: FormGroup;

  constructor(private fb:FormBuilder ,private _businesServie: BussinesService, private _usersService: UsersBusinessService
    ,private dialogRef: MatDialogRef<DlgCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
        this.forms = this.fb.group({
          nombre:['', Validators.required],
          phone:['', Validators.required]
        })
    }

    createInfo(){
      const newBusiness:any = {
        id: uuidv4(),
        name: this.forms.value.nombre,
        phone: this.forms.value.phone
      }

      if (this.data === 'newBusiness') {
        this._businesServie.createBusiness(newBusiness)
        this.dialogRef.close()
      }

      if (this.data.tipo === 'newUser') {
        const newUser = {
          idBusiness: this.data.id,
          ...newBusiness
        }
        this._usersService.createUsers(newUser)
        this._usersService.filterUsers(this.data.id)
        this.dialogRef.close()
      }
    }

}
