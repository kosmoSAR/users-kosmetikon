import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pictures } from 'src/app/interfaces/picture.interfaces';
import { FilesService } from '../../services/files.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnChanges, OnDestroy {

  displayedColumns: string[] = ['FECHA', 'ENLACE', 'acciones']

  @Input() public pictureList: Pictures[] = [];
  public data!: any;
  public loading: boolean = true;
  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(private _fileService: FilesService){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pictureList.length > 0) {
      this.loading = false
    }
    this.data = new MatTableDataSource<Pictures>(this.pictureList);
    this.data.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.notifier$.next(true);
		this.notifier$.complete();
  }

  @Output() picture: EventEmitter<any> = new EventEmitter();

  onDelete(pictureInput: Pictures){
    this.picture.emit(pictureInput)
  }

  downLoad(pictureInput: Pictures){
    this._fileService.getFile(pictureInput.ENLACE).pipe(
      takeUntil(this.notifier$)
    ).subscribe(console.log)
  }

}
