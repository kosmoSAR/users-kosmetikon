import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { Usuarios } from 'src/app/interfaces/users.interfaces';
import { AuthenticationService } from '../../services/authentication.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnDestroy, OnInit{

  public forms!: FormGroup;
  private notifier$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('txtTagInput') public tagInput!: ElementRef<HTMLInputElement>
  public cargos: any = [];
  public filteredOptions: any;

  constructor(private fb: FormBuilder, private _userService: UsersService , private _snackBar: MatSnackBar, private router: Router,
    private cookies: CookieService, private _authentication: AuthenticationService) {
    this.forms = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  ngOnInit(): void {
    this._userService.getPositionList().pipe(
      takeUntil(this.notifier$)
      ).subscribe({
        next: (resp) => {
          this.cargos = resp;
          this.filteredOptions = this.cargos;
        },
        error: (error: Error) => {
          console.log(error);
        }
      });
    }

  ngOnDestroy(): void {
    this.notifier$.next(true);
    this.notifier$.complete();
  }

  filtro() {
    this._filter(this.tagInput.nativeElement.value)
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();

    this.filteredOptions = this.cargos.filter((cargo: any) => {
      return cargo.CARGO.toLowerCase().includes(filterValue)
    });

  }

  obtenerIdCargo(str: string) {
    const id = str.split('-')[0];
    return Number(id);
  }

  async newUser() {
    try {
      const usuario: Usuarios = {
        NOMBRE: this.forms.value.nombre,
        APELLIDO: this.forms.value.apellido,
        FECHA_NACIMIENTO: this.forms.value.fechaNacimiento,
        EMAIL: this.forms.value.email,
        ID_CARGO: this.obtenerIdCargo(this.forms.value.cargo),
        PASSWORD: this.forms.value.password
      }
      const registerUser$ = this._userService.newUser( usuario ).pipe(
        takeUntil(this.notifier$)
      );
      const resultado1 = await lastValueFrom(registerUser$)

      if ( resultado1.status == '201') {
        this.createSnackBar();
        this.login( usuario );
      } else {
        this.errorSnackBar( resultado1.message );
      }
    } catch (error) {
      throw new Error('Erros al tratar de registra usuario')
    }
  }

  createSnackBar() {
    this._snackBar.open("Has añadido un nuevo cliente", "", {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  errorSnackBar(error: string) {
    this._snackBar.open(error, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  login(usuario: any) {

    const loginUser: any = {
      EMAIL: usuario.EMAIL,
      PASSWORD: usuario.PASSWORD
    }

    this._authentication.login(loginUser).pipe(
      takeUntil(this.notifier$)
    ).subscribe({
      next: (resp => {
        this.cookies.set('access_token', resp.body.token)
        this.router.navigate(['dashboard'])
      }),
      error: ( error => {
        this.errorSnackBar(error)
      })
    })
  }

}
