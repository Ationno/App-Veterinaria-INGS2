import { Component } from '@angular/core';
import { Cruza } from 'src/app/interfaces/Cruza';
import { CruzasService } from 'src/app/servicios/cruzas.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-cruza',
  templateUrl: './cruza.component.html',
  styleUrls: ['./cruza.component.css']
})
export class CruzaComponent {
    cruzas: Cruza[] = [];
    recomendados: Cruza[] = [];
    cruza!: Cruza;
    usuarioId!: number;
    busquedaNombre!: string; 
	  busquedaRaza!: string;
	  busquedaTamano!: string;
	  busquedaSexo!: string;
	  isLogged!: boolean;
    isAdmin!: boolean;
    haySeleccionado: boolean = false;

    constructor(
        private cruzaService: CruzasService,
        private tokenService: TokenService,
		    private authService: AuthService,
    ){}

    ngOnInit(){
        this.isLogged = this.tokenService.isLogged()
        this.isAdmin = this.tokenService.isAdmin()
        this.authService.getMainUsuario().subscribe((usuario) => {
            this.usuarioId = usuario.id
        })
        this.cruzaService.get().subscribe((cruzas) => {
            this.cruzas = cruzas
        })
    }

    public deleteCruza(cruza: Cruza) {
      this.cruzaService.delete(cruza).subscribe(() => {
        this.cruzas = this.cruzas.filter( ele => ele.id !== cruza.id )
        alert("Mascota eliminada exitosamente")
      })
    }

    getFilteredCruzas(): Cruza[] {
      if (this.isAdmin) {
        return this.cruzas;
      } else {
        return this.cruzas.filter((cruza => cruza.usuario_id == this.usuarioId))
      }
    }

    comenzarCruza(cruza: Cruza){
        const sexoRecomendado = cruza.mascota.sexo == 'Macho' ? 'Hembra' : 'Macho';
        const razaRecomendada = cruza.mascota.raza;  
        this.recomendados = this.cruzas.filter((c) => (c.mascota.raza == razaRecomendada) && (c.mascota.sexo == sexoRecomendado) && (c.usuario_id != cruza.usuario_id));
        if(this.recomendados.length == 0){
          alert("Actualmente no existen mascotas compatibles con la que seleccionó para realizar la cruza")
        } else{
          this.haySeleccionado = true;
        }
    }

    cancelarCruza(){
      this.haySeleccionado = false;
    }
}
