import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormatPipe } from '../../pipes/format.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dlg-modify',
  templateUrl: './dlg-modify.component.html',
  styleUrls: ['./dlg-modify.component.css']
})

export class DlgModifyComponent {

  public forms: FormGroup;
  public disableSelect = new FormControl(false);

  constructor( private pipe: FormatPipe, private pipeCommon: DecimalPipe,private fb:FormBuilder, private dialogRef: MatDialogRef<DlgModifyComponent>){
    this.forms = this.fb.group({
      millesFormat:['', Validators.required],
      decimaFormat:['', Validators.required],
      number:['', [Validators.required, Validators.minLength(2)]]
    })
  }

  modify(){
    const format: any = {
      format: this.forms.value.millesFormat,
      number: this.forms.value.number
    }

    this.dialogRef.close(format)

  }

  decimalChange(event: any){
    if (event.value == 1) {
      this.forms.controls["decimaFormat"].setValue(2);

      if (this.forms.controls["number"].value) {
        const withoutDot = this.forms.controls["number"].value.replaceAll(",","")
        const numberTransform = parseFloat(withoutDot)
        const valueTransformed = this.pipe.transform(numberTransform)
        this.forms.controls["number"].setValue(valueTransformed);
      }
    }

    if (event.value == 2) {
      this.forms.controls["decimaFormat"].setValue(1);

      if (this.forms.controls["number"].value) {
        const withoutDot = this.forms.controls["number"].value.replaceAll(".","")
        const withCom = withoutDot.replace(",",".")
        const numberTransform = parseFloat(withCom)
        const valueTransformed = this.pipeCommon.transform(numberTransform, '1.2-5');
        this.forms.controls["number"].setValue(valueTransformed);
      }
    }
  }

  format( event: any ){
    if ( this.forms.controls["millesFormat"].value == 1 ) {
      const withoutDot = event.target.value.replaceAll(".","")
      const withCom = withoutDot.replace(",",".")
      const numberTransform = parseFloat(withCom)
      const valueTransformed = this.pipe.transform(numberTransform)
      this.forms.controls["number"].setValue(valueTransformed);
    }

    if ( this.forms.controls["millesFormat"].value == 2 ) {
      const withoutCom = event.target.value.replaceAll(",","")
      const numberTransform = parseFloat(withoutCom);
      const valueTransformed = this.pipeCommon.transform(numberTransform, '1.2-5');
      this.forms.controls["number"].setValue(valueTransformed);
    }
  }

}
