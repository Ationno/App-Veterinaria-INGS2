import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
    selector: 'app-formulario-pago',
    templateUrl: './formulario-pago.component.html',
    styleUrls: ['./formulario-pago.component.css']
})
export class FormularioPagoComponent {
    subscription?: Subscription;
    form: FormGroup;
    sub: any;
    eleccion!: String;
    montoDescuento!: number;
  
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public router: Router,
        private turnosService: TurnosService,
    ){
        this.form = this.formBuilder.group({
            id: [],
            monto: new FormControl('', { validators: [Validators.required, Validators.min(0)], updateOn: 'blur' }),
            turno_id: new FormControl(''),
            titular: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z ]*$')], updateOn: 'blur' }),
            nroTarjeta: new FormControl('', { validators: [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]*$')], updateOn: 'blur' }),
            codigo: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]*$')], updateOn: 'blur' }),
            fechaVencimiento: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      })
      this.sub = this.route.params.subscribe(params => {
        if (params['turnoId'] != -1) {
          this.form.patchValue({ "turno_id": params['turnoId'] })
        }
        else{
          this.form.patchValue({ "turno_id": 0})
        }
      });

      this.turnosService.obtenerMontoDescuentoUsuario(this.form.getRawValue()).subscribe((montoDescuento) => {
          this.montoDescuento = montoDescuento.monto_a_descontar;
      })

    }



    get Monto() {
      return this.form.get("monto");
    }
  
    get Titular() {
      return this.form.get("titular");
    }
  
    get NroTarjeta() {
      return this.form.get("nroTarjeta");
    }
  
    get Codigo() {
      return this.form.get("codigo");
    }
  
    get FechaVencimiento() {
      return this.form.get("fechaVencimiento");
    }

    elegirPago(opcion: String){
      this.eleccion = opcion;
    }

    get montoTotal(){
        const montoTotal = this.form.get('monto')?.value - this.montoDescuento;
        if(montoTotal < 0){
          return 0;
        }
        return montoTotal.toFixed(2);

    }

    onPay(){
      if (this.form.valid) {
        console.log(this.form.getRawValue())
        this.turnosService.confirmarAsistencia(this.form.getRawValue()).subscribe((message) => {
          if (message.error) {
            alert(message.error)
          } else {
            alert("Pago realizado exitosamente!")
            this.router.navigate(['/turnos']);
            this.form.reset()
          }
        })
      } else {
        console.log(this.form.getRawValue())
        console.log(this.form.errors)
        this.form.markAllAsTouched();
      }
    }
}
