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

  public userInfo!: any;
  public onDelete: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DlgDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _userService: UsersService,
    private _snackBar: MatSnackBar
  ) { }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  PasswordEdit(){
    this.userInfo = {
      EMAIL: this.data.EMAIL,
      PASSWORD: this.tagInput.nativeElement.value,
    }

    this.onDelete = true;
  }

  deleteUser(){
    this._userService.deleteUser( this.userInfo ).subscribe({
      next: ( resp: any ) => {
        console.log(resp);
        this.deleteSnackBar();
        this.dialogRef.close();
      },
      error: ( error: any ) => {
        console.log(error);

        this.errorSnackBar( error.error.message )
      },
      complete: () => {
        window.location.href = "./index.html"
      }
    })
  }

  closedlg(){
    this.dialogRef.close()
  }

  deleteSnackBar() {
    this._snackBar.open("Has eliminado el usuario", "",{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  errorSnackBar( error: string ) {
    this._snackBar.open( error, "",{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
