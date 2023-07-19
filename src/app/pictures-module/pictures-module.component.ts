import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Pictures } from '../interfaces/picture.interfaces';
import { PictureService } from './services/picture.service';
import { FilesService } from './services/files.service';
import { DlgAddComponent } from './components/dlg-add/dlg-add.component';
import { DlgDeletePictureComponent } from './components/dlg-delete/dlg-delete.component';

@Component({
  selector: 'app-pictures-module',
  templateUrl: './pictures-module.component.html',
  styleUrls: ['./pictures-module.component.css']
})
export class PicturesModuleComponent {

  public pictureList: Pictures[] = [];

  constructor(private _pictureService:PictureService, private _dialog: MatDialog,
    private _fileService: FilesService, private _snackBar: MatSnackBar, private router:Router){}

  ngOnInit(): void {
    this.loadPictures()
  }

  loadPictures(){
    this._pictureService.getPictures().subscribe({
      next: ( pictures ) => {
        this.pictureList = pictures;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async openDialogAdd(): Promise<void>{
    try{
      const dialogRef = this._dialog.open(DlgAddComponent);
      const observable1$ = dialogRef.afterClosed(); //afterClosed //Hacerlo en el dialogo
      const resultado1 = await lastValueFrom(observable1$);
      if ( resultado1 ) {
        this.pictureList = resultado1;
      }
    } catch ( error: any ) {
      console.log(error);
      this.errorSnackBar(error)
    }
  }

  async openDialogDelete( picture: Pictures ): Promise<void>{
    try{
      const dialogRef = this._dialog.open(DlgDeletePictureComponent, { data:picture });
      const observable1$ = dialogRef.beforeClosed();
      const resultado1: Pictures[] = await lastValueFrom(observable1$);
      if ( resultado1 ) {
        this.pictureList = resultado1;
      }
    } catch (error) {
      this.errorSnackBar(error)
    }
  }

  errorSnackBar(error: any): void {
    this._snackBar.open(error.error.message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  errorSnackBar2(error: any): void {
    this._snackBar.open(error.message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  formatPage(){
    this.router.navigate(['format'])
  }

}
