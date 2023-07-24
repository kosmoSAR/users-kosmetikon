import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersBusiness } from '../interfaces/usersBusiness.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersBusinessService {

  private usersCompanies:BehaviorSubject<UsersBusiness[]> = new BehaviorSubject<UsersBusiness[]>([]);
  private usersCompanies$ = this.usersCompanies.asObservable();

  private usersFilteredByCompanie:BehaviorSubject<UsersBusiness[]> = new BehaviorSubject<UsersBusiness[]>([]);
  private usersFilteredCompanies$ = this.usersFilteredByCompanie.asObservable();

  getusersCompanies(): Observable<UsersBusiness[]>{
    return this.usersCompanies$;
  }

  getUsersFilteredCompanies(): Observable<UsersBusiness[]>{
    return this.usersFilteredCompanies$;
  }

  filterUsers( id: string ): void{
    const usersList = this.usersCompanies.getValue();
    let usersfiltered = usersList.filter( (usersInList: UsersBusiness) => usersInList.idBusiness === id)
    this.usersFilteredByCompanie.next(usersfiltered);
  }

  createUsers( user: UsersBusiness): void{
    const usersList = this.usersCompanies.getValue();
    usersList.push(user);
    this.usersCompanies.next(usersList);
  }

  editUser( user: UsersBusiness ): void{
    const usersList = this.usersCompanies.getValue();
    let usersSelect = usersList.filter( (usersInList: UsersBusiness) => usersInList.id === user.id );
    usersSelect[0].name = user.name;
    usersSelect[0].phone = user.phone;
    this.usersCompanies.next(usersList);
  }

  deleteUser( id: string ): void{
    const usersList = this.usersCompanies.getValue();
    const usersFiltered = usersList.filter( (businessInList: UsersBusiness) => businessInList.id !== id );
    this.usersCompanies.next(usersFiltered);
  }


}
