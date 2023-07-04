import { AfterViewInit, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoordenadasService } from 'src/app/servicios/coordenadas.service';
import * as L from "leaflet";
import { icon, Marker } from 'leaflet';
import { HttpClient } from '@angular/common/http';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
	selector: 'app-formulario-coordenada',
	templateUrl: './formulario-coordenada.component.html',
	styleUrls: ['./formulario-coordenada.component.css']
})

export class FormularioCoordenadaComponent implements AfterViewInit {
	subscription?: Subscription;
	form: FormGroup;
	sub: any;
	marker: any;
	edit: boolean = false;
	private map!: L.Map;

	constructor(
		private formBuilder: FormBuilder,
		private coordenadaService: CoordenadasService,
		private route: ActivatedRoute,
		public router: Router,
		private httpClient: HttpClient
	) {
		this.form = this.formBuilder.group({
			id: [],
			coordenadaX: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			coordenadaY: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			titulo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			parrafo: new FormControl('', { validators: Validators.required, updateOn: 'blur' })
		})
		this.sub = this.route.params.subscribe(params => {
			this.edit = params['coordenadaId'] != -1;
			if (this.edit) {
				this.edit = true;
				this.coordenadaService.getById(params['coordenadaId']).subscribe((coordenada) => {
					this.form?.patchValue(coordenada)
				})
			} else {
				this.form.reset()
			}
		});
	}

	private initMap(): void {
		this.map = L.map('map', {
			center: [-34.91199624780837, -57.94274023303688],
			zoom: 17
		});

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			minZoom: 3,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		tiles.addTo(this.map);

		this.map.on('click', (ev) => {

			if (this.marker != undefined) {
				this.map.removeLayer(this.marker);
			};

			this.marker = L.marker(ev.latlng).addTo(this.map);
			this.marker.bindPopup("<b>Coordenada a agregar</b>").openPopup(); // ev is an event object (MouseEvent in this case)
			this.httpClient.get<any>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${ev.latlng.lat}&lon=${ev.latlng.lng}`).subscribe((data) => {
				console.log(data.address.road, data.address.house_number, data.address.city, data.address.state, data.address.country)
				console.log(data)
			})
			this.form.patchValue({
				coordenadaX: ev.latlng.lat,
				coordenadaY: ev.latlng.lng,
			});

		});
	}

	ngAfterViewInit(): void {
		this.initMap();
	}

	get CoordenadaX() {
		return this.form.get("coordenadaX");
	}

	get CoordenadaY() {
		return this.form.get("coordenadaY");
	}

	get Titulo() {
		return this.form.get("titulo");
	}

	get Parrafo() {
		return this.form.get("parrafo");
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.coordenadaService.add(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					alert("Coordenada agregada exitosamente!")
					this.router.navigate(['/#visitanos']);
					this.form.reset()
				}
			});
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.coordenadaService.edit(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					alert("Coordenada editada exitosamente!")
					this.router.navigate(['/#visitanos']);
					this.form.reset()
				}
			})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}