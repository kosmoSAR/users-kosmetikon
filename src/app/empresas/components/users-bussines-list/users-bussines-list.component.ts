import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { Pictures } from 'src/app/interfaces/picture.interfaces';

@Component({
  selector: 'users-bussines-list',
  templateUrl: './users-bussines-list.component.html',
  styleUrls: ['./users-bussines-list.component.css']
})
export class UsersBussinesListComponent {

  displayedColumns: string[] = ['ID', 'NOMBRE', 'ACCIONES']

  @Input() public usersBusinessList: any[] = [];
  public data!: any;
  public loading: boolean = true;
  private notifier$: Subject<boolean> = new Subject<boolean>();

  constructor(){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.usersBusinessList.length > 0) {
      this.loading = false
    }
    this.data = new MatTableDataSource<Pictures>(this.usersBusinessList);
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

}
