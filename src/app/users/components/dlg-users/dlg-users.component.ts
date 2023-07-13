import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/interfaces/users.interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dlg-users',
  templateUrl: './dlg-users.component.html',
  styleUrls: ['./dlg-users.component.css']
})
export class DlgUsersComponent {

  public forms!: FormGroup;

  @ViewChild('txtTagInput') public tagInput!: ElementRef<HTMLInputElement>
  public cargos:any = [];
  public filteredOptions:any;
  public cargoSeleccionado:any;

  constructor(private fb:FormBuilder, private _userService: UsersService, private _snackBar: MatSnackBar, private router:Router,
    public dialogRef: MatDialogRef<DlgUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    {
      if ( data.event === 'new' ) {
        this.forms = this.fb.group({
          nombre:['', Validators.required],
          apellido:['', Validators.required],
          fechaNacimiento:['', Validators.required],
          email:['', [Validators.required, Validators.email]],
          cargo:['', Validators.required],
          password:['', Validators.required],
        })
      }

      if ( data.event === 'update' ){
        this.forms = this.fb.group({
          nombre:[data.user.NOMBRE, Validators.required],
          apellido:[data.user.APELLIDO, Validators.required],
          fechaNacimiento:[data.user.FECHA_NACIMIENTO, Validators.required],
          email:[data.user.EMAIL, Validators.required],
          cargo:[data.user.ID_CARGO + "-" + data.cargo, Validators.required],
          password:[data.user.PASSWORD, Validators.required],
        })
      }
    }
  }

  ngOnInit(): void {
    this._userService.getPositionList().subscribe({
      next: (resp) => {
        this.cargos = resp;
        this.filteredOptions = this.cargos;
      },
      error: (error:Error) => {
        console.log(error);
      }
    });
  }

  filtro(){
    this._filter(this.tagInput.nativeElement.value)
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();

    this.filteredOptions = this.cargos.filter( (cargo:any) => {
      return cargo.CARGO.toLowerCase().includes(filterValue)
    });

  }

  obtenerIdCargo(str: string) {
    const id = str.split('-')[0];
    return Number(id);
  }

  newEditUser(){

    const usuario: Usuarios = {
      NOMBRE: this.forms.value.nombre,
      APELLIDO: this.forms.value.apellido,
      FECHA_NACIMIENTO: this.forms.value.fechaNacimiento,
      EMAIL: this.forms.value.email,
      ID_CARGO: this.obtenerIdCargo(this.forms.value.cargo),
      PASSWORD: this.forms.value.password
    }

    console.log(usuario);


    if ( this.data.event === 'update' ) {
      this._userService.updateUser( usuario ).subscribe({
        next: ( resp: any ) => {
          console.log(resp);
          this.dialogRef.close();
          this.updateSnackBar()
        },
        error: ( error: any ) => {
          this.errorSnackBar( error.error )
        }
      });
    } else if ( this.data.event === 'new' ) {
      this._userService.newUser( usuario ).subscribe({
        next: ( resp: any ) => {
          this.forms.reset();
          this.dialogRef.close();
          this.createSnackBar()
        },
        error: ( error: any ) => {
          console.log(error.error);

          this.errorSnackBar( error.error )
        }
      });
    }
  }

  createSnackBar() {
    this._snackBar.open("Has añadido un nuevo cliente", "",{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    window.location.href = "./index.html"
  }

  updateSnackBar() {
    this._snackBar.open("Has actualizado al cliente", "",{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    window.location.href = "./index.html"
  }

  errorSnackBar( error: string ) {
    this._snackBar.open( error, "",{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
