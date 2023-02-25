import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { CarteleraComponent } from './components/cartelera/cartelera.component';
import { FichaEventoComponent } from './components/ficha-evento/ficha-evento.component';
import { CarritoComponent } from './carrito/carrito.component';
import { SesionesComponent } from './sesiones/sesiones.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    FichaEventoComponent,
    HeaderComponent,
    CarritoComponent,
    SesionesComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
