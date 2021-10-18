
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
import { LineComponent } from './components/line/line.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { JobAComponent } from './components/job-a/job-a.component';
import { AuthGuardGuard } from './auth-guard.guard';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: CLientesComponent, canActivate: [AuthGuardGuard] },
  { path: 'orden-de-trabajo', component: OrdenDeTrabajoComponent, canActivate: [AuthGuardGuard] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuardGuard] },
  { path: 'finanzas', component: FinanzasComponent, canActivate: [AuthGuardGuard] },
  { path: 'product', component: InventarioComponent, canActivate: [AuthGuardGuard] },
  { path: 'nav', component: NavComponent, canActivate: [AuthGuardGuard] },
  { path: 'mechanic', component: MechanicComponent, canActivate: [AuthGuardGuard] },
  { path: 'line', component: LineComponent, canActivate: [AuthGuardGuard] },
  { path: 'car', component: CarComponent, canActivate: [AuthGuardGuard] },
  { path: 'brand', component: BrandComponent, canActivate: [AuthGuardGuard] },
  { path: 'job', component: JobAComponent, canActivate: [AuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
