import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuarios } from '../interfaces/users.interfaces';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  constructor(private _userServie: UsersService){
    this.getDatos();
  }

  private obsSubject:BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  private obsMessage:BehaviorSubject<string> = new BehaviorSubject<string>("");
  //Convertirlo em un observable
  public obsSubject$ = this.obsSubject.asObservable();
  public obsMessage$ = this.obsMessage.asObservable();

  getDatos():void {
    this._userServie.getUserList().subscribe( (resp) => {
        this.obsSubject.next( resp );
    } )
  }

  newUser( user: Usuarios ){
    this._userServie.newUser( user ).subscribe( ( resp ) => {
      this.obsMessage.next( resp.message );
      this.getDatos()
    } )
  }

  updateUser( user: Usuarios ){
    this._userServie.updateUser( user ).subscribe( (resp) => {
      this.obsMessage.next( resp.message );
      this.getDatos()
    })
  }

  deleteUser ( user: any){
    this._userServie.deleteUser( user ).subscribe( (resp) => {
      this.obsMessage.next( resp.message );
      this.getDatos()
    })
  }

}
