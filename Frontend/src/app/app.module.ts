import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavComponent } from './nav/nav.component';
import { OrdenDeTrabajoComponent } from './components/orden-de-trabajo/orden-de-trabajo.component';
import { CLientesComponent } from './components/clientes/clientes.component';
import { FinanzasComponent } from './components/finanzas/finanzas.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { LoginComponent } from './public/login/login.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { NewOrdenComponent } from './components/new-orden/new-orden.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './services/interceptor/interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OrdenDeTrabajoComponent,
    CLientesComponent,
    FinanzasComponent,
    ProveedoresComponent,
    InventarioComponent,
    LoginComponent,
    AddClientComponent,
    NewOrdenComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
