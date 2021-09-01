
import { AddClientComponent } from './components/add-client/add-client.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { FinanzasComponent } from './components/finanzas/finanzas.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { OrdenDeTrabajoComponent } from './components/orden-de-trabajo/orden-de-trabajo.component';
import { CLientesComponent } from './components/clientes/clientes.component';
import { LoginComponent } from './public/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { MechanicComponent } from './components/Mechanic/Mechanic.component';

const routes: Routes = [

  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'clientes',component:CLientesComponent},
  {path:'orden-de-trabajo',component:OrdenDeTrabajoComponent},
  {path:'proveedores',component:ProveedoresComponent},
  {path:'finanzas',component:FinanzasComponent},
  {path:'product',component:InventarioComponent},
  {path:'nav',component:NavComponent},
  {path:'add-client',component:AddClientComponent},
  {path:'mechanic',component:MechanicComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
