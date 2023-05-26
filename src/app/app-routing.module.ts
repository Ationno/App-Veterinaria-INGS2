import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { FormularioUsuarioComponent } from './components/usuarios/formulario-usuario/formulario-usuario.component';
import { FormularioAnuncioComponent } from './components/anuncios/formulario-anuncio/formulario-anuncio.component';
import { FormularioTurnoComponent } from './components/turnos/formulario-turno/formulario-turno.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { FormularioMascotaComponent } from './components/mascotas/formulario-mascota/formulario-mascota.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent, pathMatch: 'full' },
  { path: 'anuncios', component: AnunciosComponent, pathMatch: 'full' },
  { path: 'turnos', component: TurnosComponent, pathMatch: 'full' },
  { path: 'usuarios/formUsuarios/:id', component: FormularioUsuarioComponent, pathMatch: 'full' },
  { path: 'anuncios/formAnuncios/:id', component: FormularioAnuncioComponent, pathMatch: 'full' },
  { path: 'turnos/formTurnos/:id', component: FormularioTurnoComponent, pathMatch: 'full' },
  { path: 'usuarios/formUsuarios/:id', component: FormularioUsuarioComponent, pathMatch: 'full' },
  { path: 'anuncios/formAnuncios/:id', component: FormularioAnuncioComponent, pathMatch: 'full' },
  { path: 'mascotas/:id', component: MascotasComponent, pathMatch: 'full' },
  { path: 'mascotas/formMascota/:usuarioId/:mascotaId', component: FormularioMascotaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
