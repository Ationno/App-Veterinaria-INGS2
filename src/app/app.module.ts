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
import { AnunciosComponent } from './components/anuncios/anuncio.component';
import { FormularioAnuncioComponent } from './components/anuncios/formulario-anuncio/formulario-anuncio.component';

//Usuarios
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilUsuarioComponent } from './components/usuarios/perfil-usuario/perfil-usuario.component';
import { FormularioUsuarioComponent } from './components/usuarios/formulario-usuario/formulario-usuario.component';

//Footer
import { FooterComponent } from './components/footer/footer.component';

//Turnos
import { TurnosComponent } from './components/turnos/turnos.component';
import { ListaTurnosComponent } from './components/turnos/lista-turnos/lista-turnos.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { MascotaComponent } from './components/mascotas/mascota/mascota.component';
import { FormularioMascotaComponent } from './components/mascotas/formulario-mascota/formulario-mascota.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    AnunciosComponent,
    FormularioAnuncioComponent,
    UsuariosComponent,
    PerfilUsuarioComponent,
    FormularioUsuarioComponent,
    FooterComponent,
    TurnosComponent,
    ListaTurnosComponent,
    MascotasComponent,
    MascotaComponent,
    FormularioMascotaComponent
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
