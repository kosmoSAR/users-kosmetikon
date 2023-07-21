import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dlg-edit-bussines',
  templateUrl: './dlg-edit-bussines.component.html',
  styleUrls: ['./dlg-edit-bussines.component.css']
})
export class DlgEditBussinesComponent {

  forms!: FormGroup;

  constructor(private fb:FormBuilder ,private dialogRef: MatDialogRef<DlgEditBussinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
      console.log(data);
      if (data.tipo === "bussines") {
        this.forms = this.fb.group({
          nombre:[data.business.name, Validators.required]
        })
      }
      if (data.tipo === "user") {
        this.forms = this.fb.group({
          nombre:[data.business.nombre, Validators.required]
        })
      }
    }

    updateInfo(){
      const info:any = {name: this.forms.value.nombre}
      console.log(info);
    }

}
