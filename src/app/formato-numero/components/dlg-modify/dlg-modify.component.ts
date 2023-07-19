import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Format } from 'src/app/interfaces/format.interface';

@Component({
  selector: 'app-dlg-modify',
  templateUrl: './dlg-modify.component.html',
  styleUrls: ['./dlg-modify.component.css']
})

export class DlgModifyComponent {

  public forms: FormGroup;
  public disableSelect = new FormControl(false);
  public numberInput: number = 0;
  public millesFormat: number = 1;
  public decimaFormat: number = 2;


  constructor(private fb:FormBuilder, private dialogRef: MatDialogRef<DlgModifyComponent>){
    this.forms = this.fb.group({
      millesFormat:['', Validators.required],
      decimaFormat:['', Validators.required],
      number:['', [Validators.required, Validators.minLength(2)]]
    })
  }

  modify(){
    const format: Format = {
      format: this.forms.value.millesFormat,
      number: this.forms.value.number
    }

    this.dialogRef.close(format)

  }

  decimalChange(event: Event){
    console.log(event);
  }

}
