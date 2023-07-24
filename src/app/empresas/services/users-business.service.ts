import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersBusinessService {

  private usersCompanies:BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  private usersCompanies$ = this.usersCompanies.asObservable();

  private usersFilteredByCompanie:BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  private usersFilteredCompanies$ = this.usersFilteredByCompanie.asObservable();

  getusersCompanies(): Observable<any[]>{
    return this.usersCompanies$;
  }

  getUsersFilteredCompanies(): Observable<any[]>{
    return this.usersFilteredCompanies$;
  }

  filterUsers( id: string ){
    const usersList = this.usersCompanies.getValue();
    let usersfiltered = usersList.filter( (usersInList:any) => usersInList.idBusiness === id)
    this.usersFilteredByCompanie.next(usersfiltered);
  }

  createUsers( user: any){
    const usersList = this.usersCompanies.getValue();
    usersList.push(user);
    this.usersCompanies.next(usersList);
  }

  editUser( user: any ){
    const usersList = this.usersCompanies.getValue();
    let usersSelect = usersList.filter( (usersInList:any) => usersInList.id === user.id );
    usersSelect[0].name = user.name;
    usersSelect[0].phone = user.phone;
    this.usersCompanies.next(usersList);
  }

  deleteUser( id: string ){
    const usersList = this.usersCompanies.getValue();
    const usersFiltered = usersList.filter( (businessInList:any) => businessInList.id !== id );
    this.usersCompanies.next(usersFiltered);
  }


}
