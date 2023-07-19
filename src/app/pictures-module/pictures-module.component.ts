import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { Pictures } from '../interfaces/picture.interfaces';
import { PictureService } from './services/picture.service';
import { DlgAddComponent } from './components/dlg-add/dlg-add.component';
import { DlgDeletePictureComponent } from './components/dlg-delete/dlg-delete.component';

@Component({
  selector: 'app-pictures-module',
  templateUrl: './pictures-module.component.html',
  styleUrls: ['./pictures-module.component.css']
})

export class PicturesModuleComponent implements OnDestroy {

  public pictureList: Pictures[] = [];
  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _pictureService: PictureService, private _dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPictures()
  }

  ngOnDestroy(): void {
    this.notifier$.next(true);
    this.notifier$.complete();
  }

  loadPictures() {
    this._pictureService.getPictures().pipe(
      takeUntil(this.notifier$)
    ).subscribe({
      next: (pictures) => {
        this.pictureList = pictures;
      },
      error: (error) => {
        console.log(error);
        this.errorSnackBar(error)
      }
    })
  }

  async openDialogAdd(): Promise<void> {
    try {
      const dialogRef = this._dialog.open(DlgAddComponent);
      const observable1$ = dialogRef.afterClosed().pipe(
        takeUntil(this.notifier$)
      ); //afterClosed //Hacerlo en el dialogo
      const resultado1 = await lastValueFrom(observable1$);
      if (resultado1) {
        this.pictureList = resultado1;
      }
    } catch (error: any) {
      console.log(error);
      this.errorSnackBar(error)
    }
  }

  async openDialogDelete(picture: Pictures): Promise<void> {
    try {
      const dialogRef = this._dialog.open(DlgDeletePictureComponent, { data: picture });
      const observable1$ = dialogRef.afterClosed().pipe(
        takeUntil(this.notifier$)
      );
      const resultado1: Pictures[] = await lastValueFrom(observable1$);
      if (resultado1) {
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
}
