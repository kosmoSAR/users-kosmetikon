import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dlg-delete',
  templateUrl: './dlg-delete.component.html',
  styleUrls: ['./dlg-delete.component.css']
})
export class DlgDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<DlgDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {}

  deleteUser(){
    const usuario = {
      EMAIL: this.data.user.EMAIL
    }
    this.dialogRef.close( usuario );
  }

  closedlg(){
    this.dialogRef.close()
  }

}
