import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UsersListService{

  private baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

  constructor(private http: HttpClient) {
    this.getList()
  }

  private usersList:BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  private usersList$ = this.usersList.asObservable();

  getUsersList(): Observable<any>{
    return this.usersList$;
  }

  getList(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getUserList`).pipe(
      tap( (array) => {
        console.log(array);
        this.usersList.next(array)
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error)
      })
    )
  }


}
