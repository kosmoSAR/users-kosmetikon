import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

//Angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { RouterModule } from '@angular/router';
import { FormatPipe } from '../formato-numero/pipes/format.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FormatPipe
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    NgxDropzoneModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    NavbarComponent,
    FormatPipe,
    NgxDropzoneModule,
    RouterModule
  ]
})
export class SharedModule { }
