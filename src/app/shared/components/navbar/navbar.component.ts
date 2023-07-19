import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/login/services/authentication.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private _authentication: AuthenticationService, private router:Router, private _snackBar:MatSnackBar,
    private cookies:CookieService){}

  logout(){
    this._authentication.logout().subscribe({
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

  usersRoute(){
    this.router.navigate(['users'])
  }

  pictureRoute(){
    this.router.navigate(['pictures'])
  }

  formatRoute(){
    this.router.navigate(['format'])
  }

}
