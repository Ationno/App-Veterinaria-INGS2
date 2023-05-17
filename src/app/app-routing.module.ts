import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AnunciosComponent } from './components/anuncios/anuncio.component';
import { TurnosComponent } from './components/turnos/turnos.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent, pathMatch: 'full' },
  { path: 'anuncios', component: AnunciosComponent, pathMatch: 'full' },
  { path: 'turnos', component: TurnosComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }