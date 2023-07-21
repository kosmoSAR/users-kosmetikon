import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Pictures } from 'src/app/interfaces/picture.interfaces';
import { FilesService } from 'src/app/pictures-module/services/files.service';

@Component({
  selector: 'bussines-list',
  templateUrl: './bussines-list.component.html',
  styleUrls: ['./bussines-list.component.css']
})
export class BussinesListComponent {

  displayedColumns: string[] = ['ID', 'NOMBRE', 'ACCIONES']

  @Input() public bussinesList: any[] = [];
  public data!: any;
  public loading: boolean = true;
  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bussinesList.length > 0) {
      this.loading = false
    }
    this.data = new MatTableDataSource<Pictures>(this.bussinesList);
    console.log(this.data);
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

  @Output() users: EventEmitter<any> = new EventEmitter();

  usersInfo( usersList: any ){
    this.users.emit(usersList)
  }
}
