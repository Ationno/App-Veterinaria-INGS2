import { AfterViewInit, Component } from '@angular/core';
import * as L from "leaflet";
import { icon, Marker } from 'leaflet';
import { Veterinaria } from 'src/app/interfaces/Veterinaria';
import { TokenService } from 'src/app/servicios/token.service';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';
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
	selector: 'app-mapa',
	templateUrl: './mapa.component.html',
	styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

	private map!: L.Map;
	private markers: any = {};
	public isAdmin: boolean = false;
	public veterinarias!: Veterinaria[];

	constructor(private tokenService: TokenService, private veterinariaService: VeterinariasService) {
		this.isAdmin = this.tokenService.isAdmin();
	}

	private initMap(): void {
		this.map = L.map('map', {
			center: [-34.91199624780837, -57.94274023303688],
			zoom: 17
		});

		this.veterinariaService.get().subscribe((veterinarias) => {
			this.veterinarias = veterinarias;
			this.veterinarias.forEach((veterinaria) => {
				let id = veterinaria.id;
				this.markers[id] = L.marker([veterinaria.coordenadaX, veterinaria.coordenadaY]).addTo(this.map);
				this.markers[id].bindPopup(`<b>${veterinaria.titulo}</b><br>${veterinaria.parrafo}`).openPopup();
			})
		})

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			minZoom: 3,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		tiles.addTo(this.map);
	}

	ngAfterViewInit(): void {
		this.initMap();
	}

	public deleteVeterinaria(veterinaria: Veterinaria) {
		this.veterinariaService.delete(veterinaria).subscribe(() => {
            alert("Veterinaria eliminada exitosamente!")
			this.veterinarias = this.veterinarias.filter( ele => ele.id !== veterinaria.id )
			this.map.removeLayer(this.markers[veterinaria.id]);
		})
	}
}
