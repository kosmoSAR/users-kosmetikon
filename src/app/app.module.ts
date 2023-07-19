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
import { FormatoNumeroModule } from './formato-numero/formato-numero.module';
import { PicturesModuleModule } from './pictures-module/pictures-module.module';

//Servicios
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    SharedModule,
    PicturesModuleModule,
    FormatoNumeroModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
