import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FilesService } from '../../services/files.service';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { PictureService } from '../../services/picture.service';

@Component({
  selector: 'app-dlg-add',
  templateUrl: './dlg-add.component.html',
  styleUrls: ['./dlg-add.component.css']
})
export class DlgAddComponent implements OnDestroy {

  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private dialogRef: MatDialogRef<DlgAddComponent>,
    private _fileService: FilesService, private _pictureService:PictureService){}

  ngOnDestroy(): void {
    this.notifier$.next(true);
		this.notifier$.complete();
  }

  async createPicture(){
    try{
      const observable2$ = this._fileService.uploadFile(this.files[0]).pipe(
        takeUntil(this.notifier$)
      );
      const resultado2 = await lastValueFrom(observable2$);
    } catch (error: any) {
      console.log(error);
      if (error.status === 200) {
        const observable3$ = this._pictureService.getPictures().pipe(
          takeUntil(this.notifier$)
        );
        const resultado3 = await lastValueFrom(observable3$);
        this.dialogRef.close( resultado3 )
      }
    }
  }

  files: File[] = [];

  onSelect(event: any) {
    this.files.pop();
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
