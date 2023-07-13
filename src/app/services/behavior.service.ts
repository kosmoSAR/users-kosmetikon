import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  constructor( private _userService: UsersService ) {
    this._userService.getUserList().subscribe( (data) => {
      console.log(data);
    })
  }



  public listUsers(): Observable<any>{
    return new BehaviorSubject([
      {

      }

    ])
  }
}
