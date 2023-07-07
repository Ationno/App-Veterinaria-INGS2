import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Home, Login, Nav
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Anuncios
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { PerfilAnuncioComponent } from './components/anuncios/perfil-anuncio/perfil-anuncio.component';
import { FormularioAnuncioComponent } from './components/anuncios/formulario-anuncio/formulario-anuncio.component';

//Perdidos
import { PerdidosComponent } from './components/perdidos/perdidos.component';
import { PerfilPerdidoComponent } from './components/perdidos/perfil-perdido/perfil-perdido.component';
import { FormularioPerdidoComponent } from './components/perdidos/formulario-perdido/formulario-perdido.component';

//Usuarios
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilUsuarioComponent } from './components/usuarios/perfil-usuario/perfil-usuario.component';
import { FormularioUsuarioComponent } from './components/usuarios/formulario-usuario/formulario-usuario.component';

//Footer
import { FooterComponent } from './components/footer/footer.component';

//Turnos
import { TurnosComponent } from './components/turnos/turnos.component';
import { ListaTurnosComponent } from './components/turnos/lista-turnos/lista-turnos.component';
import { FormularioTurnoComponent } from './components/turnos/formulario-turno/formulario-turno.component';

//Mascotas
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { MascotaComponent } from './components/mascotas/mascota/mascota.component';
import { FormularioMascotaComponent } from './components/mascotas/formulario-mascota/formulario-mascota.component';

//informacionAdmin
import { InformacionComponent } from './components/informacion/informacion.component';
import { FormularioInformacionComponent } from './components/informacion/formulario-informacion/formulario-informacion.component';
import { FormularioInformacionAdminComponent } from './components/informacion/formulario-informacion-admin/formulario-informacion-admin.component';

//Vacunas
import { VacunasComponent } from './components/vacunas/vacunas.component';
import { FormularioVacunasComponent } from './components/vacunas/formulario-vacunas/formulario-vacunas.component';
import { VacunaComponent } from './components/vacunas/vacuna/vacuna.component';

//Adopcion
import { AdopcionesComponent } from './components/adopciones/adopciones.component';
import { AdopcionComponent } from './components/adopciones/adopcion/adopcion.component';
import { FormularioAdopcionComponent } from './components/adopciones/formulario-adopcion/formulario-adopcion.component';

//Campañas
import { CampaniasComponent } from './components/campanias/campanias.component';
import { PerfilCampaniaComponent } from './components/campanias/perfil-campania/perfil-campania.component';
import { FormularioCampaniaComponent } from './components/campanias/formulario-campania/formulario-campania.component';

//Pipes
import { FilterUsuarioPipe } from './pipes/filter-usuario.pipe';
import { FilterAdopcionPipe } from './pipes/filter-adopcion.pipe';
import { FilterMascotaPipe } from './pipes/filter-mascota.pipe';
import { FilterVacunaPipe } from './pipes/filter-vacuna.pipe';
import { FilterAnuncioPipe } from './pipes/filter-anuncio.pipe';
import { FilterPerdidoPipe } from './pipes/filter-perdido.pipe';
import { FilterCampaniaPipe } from './pipes/filter-campania.pipe';
import { FilterTurnoPipe } from './pipes/filter-turno.pipe';
import { FormularioAdoptarAnonimoComponent } from './components/adopciones/formulario-adoptar-anonimo/formulario-adoptar-anonimo.component';
import { FormularioAnuncioComunicarAnonimoComponent } from './components/anuncios/formulario-anuncio-comunicar-anonimo/formulario-anuncio-comunicar-anonimo.component';
import { BorrarMascotaComponent } from './components/mascotas/borrar-mascota/borrar-mascota.component';
import { BorrarUsuarioComponent } from './components/usuarios/borrar-usuario/borrar-usuario.component';
import { DonacionesComponent } from './components/donaciones/donaciones.component';
import { FormularioDonacionComponent } from './components/donaciones/formulario-donacion/formulario-donacion.component';
import { FilterTurnoEstadoPipe } from './pipes/filter-turno-estado.pipe';
import { HistorialDonacionesComponent } from './components/donaciones/historial-donaciones/historial-donaciones.component';
import { ServiviosComponent } from './components/home/servivios/servivios.component';
import { MapaComponent } from './components/home/mapa/mapa.component';
import { FormularioPagoComponent } from './components/turnos/formulario-pago/formulario-pago.component';
import { VeterinariaComponent } from './components/home/mapa/veterinaria/veterinaria.component';
import { FormularioVeterinariaComponent } from './components/home/mapa/formulario-veterinaria/formulario-veterinaria.component';
import { CampaniaActualComponent } from './components/home/campania-actual/campania-actual.component';
import { FormularioComunicarseComponent } from './components/perdidos/formulario-comunicarse/formulario-comunicarse.component';
import { PerrosEncontradosComponent } from './components/home/perros-encontrados/perros-encontrados.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    AnunciosComponent,
    PerdidosComponent,
    PerfilPerdidoComponent,
    FormularioPerdidoComponent,
    PerfilAnuncioComponent,
    FormularioAnuncioComponent,
    UsuariosComponent,
    PerfilUsuarioComponent,
    FormularioUsuarioComponent,
    FooterComponent,
    TurnosComponent,
    ListaTurnosComponent,
    FormularioTurnoComponent,
    MascotasComponent,
    MascotaComponent,
    FormularioMascotaComponent,
    FilterUsuarioPipe,
    FilterMascotaPipe,
    InformacionComponent,
    FormularioInformacionComponent,
    FormularioInformacionAdminComponent,
    VacunasComponent,
    FormularioVacunasComponent,
    VacunaComponent,
    FilterVacunaPipe,
    AdopcionesComponent,
    AdopcionComponent,
    CampaniasComponent,
    FilterCampaniaPipe,
    FormularioCampaniaComponent,
    PerfilCampaniaComponent,
    FilterAdopcionPipe,
    FormularioAdopcionComponent,
    FilterAnuncioPipe,
    FilterPerdidoPipe,
    FormularioAdoptarAnonimoComponent,
    FormularioAnuncioComunicarAnonimoComponent,
    FilterTurnoPipe,
    BorrarMascotaComponent,
    BorrarUsuarioComponent,
    DonacionesComponent,
    FormularioDonacionComponent,
    FilterTurnoEstadoPipe,
    HistorialDonacionesComponent,
    ServiviosComponent,
    MapaComponent,
    FormularioPagoComponent,
    VeterinariaComponent,
    FormularioVeterinariaComponent,
    CampaniaActualComponent,
    FormularioComunicarseComponent,
    PerrosEncontradosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
