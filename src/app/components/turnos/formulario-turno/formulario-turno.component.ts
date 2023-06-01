import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/interfaces/Turno';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-formulario-turno',
  templateUrl: './formulario-turno.component.html',
  styleUrls: ['./formulario-turno.component.css']
})
export class FormularioTurnoComponent {
  @Output() onAddExperience: EventEmitter<Turno> = new EventEmitter();
  @Output() onEditExperience: EventEmitter<Turno> = new EventEmitter();
  @Output() onToggleFormExperience: EventEmitter<Event> = new EventEmitter();
  showFormExperience: boolean = false;
  subscription?: Subscription;
  form: FormGroup;
  sub: any;
  edit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private turnosService: TurnosService,
    private usuariosService: UsuariosService,
    private mascotasService: MascotasService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.form = this.formBuilder.group({
      id: [],
      horario: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      motivo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      documento: new FormControl('', { validators: Validators.required }),
      nombrePerro: new FormControl('', { validators: Validators.required })
    })
    this.sub = this.route.params.subscribe(params => {
      this.edit = params['id'] != -1;
      if (this.edit) {
        this.edit = true;
        this.turnosService.getById(params['id']).subscribe((turno) => {
          this.form?.patchValue(turno)
        })
      } else {
        this.form.reset()
      }
    });
  }

  get Horario() {
    return this.form.get("horario");
  }

  get Motivo() {
    return this.form.get("motivo");
  }

  public onAdd(): void {
    if (this.form.valid) {
      const documento = this.form.get('documento')?.value;
      const nombrePerro = this.form.get('nombrePerro')?.value;

      this.usuariosService.getByDocumento(documento).subscribe((usuario_id) => {
        if (!usuario_id) {
          console.log('El usuario no existe');
          return;
        }

        this.mascotasService.getByNombre(nombrePerro, usuario_id).subscribe((mascota_id) => {
          if (!mascota_id) {
            console.log('El perro no existe para el usuario');
            return;
          }

          const turno: Turno = {
            estado: "",
            horario: this.form.get('horario')?.value,
            motivo: this.form.get('motivo')?.value,
            usuario_id: usuario_id,
            mascota_id: mascota_id
          };

          this.turnosService.add(turno).subscribe(() => { });
          console.log('Turno agregado exitosamente');
          this.router.navigate(['/turnos']);
          this.form.reset();
        });
      });
    } else {
      console.log(this.form.errors);
      this.form.markAllAsTouched();
    }
  }


  public onEdit(): void {
    if (this.form.valid) {
      this.turnosService.edit(this.form.getRawValue()).subscribe(() => { })
      this.router.navigate(['/turnos']);
    } else {
      console.log(this.form.errors)
      this.form.markAllAsTouched();
    }
  }

}
