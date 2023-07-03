import { AfterViewInit, Component } from '@angular/core';
import * as L from "leaflet";
import { icon, Marker } from 'leaflet';
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

		var marker = L.marker([-34.91199624780837, -57.94274023303688]).addTo(this.map);
		marker.bindPopup("<b>Nuestra Veterinaria</b><br>Trae a tus mascotas!").openPopup();

		tiles.addTo(this.map);
	}

	ngAfterViewInit(): void {
		this.initMap();
	}
}
