import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mascota } from 'src/app/interfaces/Mascota';
import { Cruza } from 'src/app/interfaces/Cruza';
import { Usuario } from 'src/app/interfaces/Usuario';
import { CruzasService } from 'src/app/servicios/cruzas.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-cruza-informacion',
  templateUrl: './cruza-informacion.component.html',
  styleUrls: ['./cruza-informacion.component.css']
})
export class CruzaInformacionComponent {
    @Input() cruza!: Cruza;
    @Input() haySeleccionado: boolean = false;
    @Output() onDeleteCruza: EventEmitter<Cruza> = new EventEmitter();
    @Output() onComenzarCruza: EventEmitter<Cruza> = new EventEmitter();
    mascota!: Mascota;
    mainUser!: Usuario;
    isLogged!: boolean;
    isAdmin!: boolean;
    fecha!: Date;
    fechaHoy!: Date;

    constructor(private authService: AuthService, private cruzaService: CruzasService, private tokenService: TokenService){}

    ngOnInit(): void{
        this.authService.getMainUsuario().subscribe((usuario) => {
            this.mainUser = usuario;
        })

        this.isLogged = this.tokenService.isLogged();
        this.isAdmin = this.tokenService.isAdmin();
        this.fecha = new Date(this.cruza.fechaCelo)
        this.fecha.setMinutes(this.fecha.getMinutes() + this.fecha.getTimezoneOffset());
        this.fechaHoy = new Date();
    }

    public onDelete(cruza: Cruza) {
        this.onDeleteCruza.emit(cruza);
    }

    public onComenzar(cruza: Cruza){
        this.onComenzarCruza.emit(cruza)
    }

    public realizarCruza(){

    }

    
}
