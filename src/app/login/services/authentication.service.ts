import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://kosmetikon.myqnapcloud.com:44444';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data , { headers: {'Content-Type': 'application/json'}, observe: 'response' });
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/logout`);
  }
}
