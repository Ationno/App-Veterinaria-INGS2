import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { PerdidosComponent } from './components/perdidos/perdidos.component';
import { CampaniasComponent } from './components/campanias/campanias.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { FormularioUsuarioComponent } from './components/usuarios/formulario-usuario/formulario-usuario.component';
import { FormularioAnuncioComponent } from './components/anuncios/formulario-anuncio/formulario-anuncio.component';
import { FormularioPerdidoComponent } from './components/perdidos/formulario-perdido/formulario-perdido.component';
import { FormularioCampaniaComponent } from './components/campanias/formulario-campania/formulario-campania.component';
import { FormularioTurnoComponent } from './components/turnos/formulario-turno/formulario-turno.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { FormularioMascotaComponent } from './components/mascotas/formulario-mascota/formulario-mascota.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { FormularioInformacionComponent } from './components/informacion/formulario-informacion/formulario-informacion.component';
import { FormularioInformacionAdminComponent } from './components/informacion/formulario-informacion-admin/formulario-informacion-admin.component';
import { VacunasComponent } from './components/vacunas/vacunas.component';
import { FormularioVacunasComponent } from './components/vacunas/formulario-vacunas/formulario-vacunas.component';
import { AdopcionesComponent } from './components/adopciones/adopciones.component';
import { FormularioAdopcionComponent } from './components/adopciones/formulario-adopcion/formulario-adopcion.component';
import { FormularioAdoptarAnonimoComponent } from './components/adopciones/formulario-adoptar-anonimo/formulario-adoptar-anonimo.component';
import { FormularioAnuncioComunicarAnonimoComponent } from './components/anuncios/formulario-anuncio-comunicar-anonimo/formulario-anuncio-comunicar-anonimo.component';
import { BorrarMascotaComponent } from './components/mascotas/borrar-mascota/borrar-mascota.component';
import { BorrarUsuarioComponent } from './components/usuarios/borrar-usuario/borrar-usuario.component';
import { DonacionesComponent } from './components/donaciones/donaciones.component';
import { FormularioDonacionComponent } from './components/donaciones/formulario-donacion/formulario-donacion.component';
import { HistorialDonacionesComponent } from './components/donaciones/historial-donaciones/historial-donaciones.component';
import { FormularioPagoComponent } from './components/turnos/formulario-pago/formulario-pago.component';
import { FormularioVeterinariaComponent } from './components/home/mapa/formulario-veterinaria/formulario-veterinaria.component';
import { FormularioComunicarseComponent } from './components/perdidos/formulario-comunicarse/formulario-comunicarse.component';
import { FormularioCruzaComponent } from './components/cruza/formulario-cruza/formulario-cruza.component';
import { CruzaComponent } from './components/cruza/cruza.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent, pathMatch: 'full' },
  { path: 'anuncios', component: AnunciosComponent, pathMatch: 'full' },
  { path: 'perdidos', component: PerdidosComponent, pathMatch: 'full' },
  { path: 'campanias', component: CampaniasComponent, pathMatch: 'full' },
  { path: 'turnos', component: TurnosComponent, pathMatch: 'full' },
  { path: 'cruza', component: CruzaComponent, pathMatch: 'full' },
  { path: 'campanias/formCampanias/:id', component: FormularioCampaniaComponent, pathMatch: 'full' },
  { path: 'usuarios/formUsuarios/:id', component: FormularioUsuarioComponent, pathMatch: 'full' },
  { path: 'anuncios/formAnuncios/:id', component: FormularioAnuncioComponent, pathMatch: 'full' },
  { path: 'perdidos/formPerdidos/:id', component: FormularioPerdidoComponent, pathMatch: 'full' },
  { path: 'turnos/formTurnos/:usuarioId/:turnoId', component: FormularioTurnoComponent, pathMatch: 'full' },
  { path: 'turnos/formPagoTurno/:turnoId', component: FormularioPagoComponent, pathMatch: 'full' },
  { path: 'usuarios/formUsuarios/:id', component: FormularioUsuarioComponent, pathMatch: 'full' },
  { path: 'mascotas/:id', component: MascotasComponent, pathMatch: 'full' },
  { path: 'mascotas/formMascota/:usuarioId/:mascotaId', component: FormularioMascotaComponent, pathMatch: 'full' },
  { path: 'informacion', component: InformacionComponent, pathMatch: 'full' },
  { path: 'informacion/formInformacion/:id', component: FormularioInformacionComponent, pathMatch: 'full' },
  { path: 'informacion/formInformacionAdmin/:id', component: FormularioInformacionAdminComponent, pathMatch: 'full' },
  { path: 'vacunas', component: VacunasComponent, pathMatch: 'full' },
  { path: 'vacunas/:id', component: VacunasComponent, pathMatch: 'full' },
  { path: 'vacunas/formVacuna/:mascotaId/:vacunaId', component: FormularioVacunasComponent, pathMatch: 'full' },
  { path: 'adopciones', component: AdopcionesComponent, pathMatch: 'full' },
  { path: 'adopciones/formAdopcion/:usuarioId/:adopcionId', component: FormularioAdopcionComponent, pathMatch: 'full' },
  { path: 'adopciones/formAdoptar/:adopcionId', component: FormularioAdoptarAnonimoComponent, pathMatch: 'full' },
  { path: 'anuncios/formAnuncioComunicacion/:email_anunciante', component: FormularioAnuncioComunicarAnonimoComponent, pathMatch: 'full' },
  { path: 'mascotas/eliminarMascota/:mascotaId', component: BorrarMascotaComponent, pathMatch: 'full' },
  { path: 'usuarios/eliminarUsuario/:usuarioId', component: BorrarUsuarioComponent, pathMatch: 'full' },
  { path: 'donaciones', component: DonacionesComponent, pathMatch: 'full' },
  { path: 'donaciones/historial', component: HistorialDonacionesComponent, pathMatch: 'full' },
  { path: 'donaciones/formDonacion/:campaniaId', component: FormularioDonacionComponent, pathMatch: 'full' },
  { path: 'mapa/formVeterinaria/:veterinariaId', component: FormularioVeterinariaComponent, pathMatch: 'full' },
  { path: 'perdido/formComunicarse/:perdidoId', component: FormularioComunicarseComponent, pathMatch: 'full' },
  { path: 'cruza/formCruza/:usuarioId/:cruzaId', component: FormularioCruzaComponent, pathMatch: 'full' },
  { path: 'cruza', component: AdopcionesComponent }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
};


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
