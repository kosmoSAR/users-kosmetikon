import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private _userService: UsersService, private router:Router, private _snackBar:MatSnackBar, private cookies:CookieService){}

  logout(){
    this._userService.logout().subscribe({
      next: ( respuesta ) => {
        this.logoutSuccesful( respuesta.message );
        this.cookies.delete('access_token')
      },
      error: (error: Error) => {
        console.log(error);
        this.error();
      },
      complete: () => {
        this.router.navigate(['login'])
      }
    })
  }

  error(){
    this._snackBar.open('Error al lagout', "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  };

  logoutSuccesful( respuesta: string){
    this._snackBar.open(respuesta, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  };

}
