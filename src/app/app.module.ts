import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Componentes
import { AppComponent } from './app.component';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';

//Servicios
import { CookieService } from 'ngx-cookie-service';
import { FormatPipe } from './formato-numero/pipes/format.pipe';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LoginModule,
  ],
  providers: [CookieService, FormatPipe, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
