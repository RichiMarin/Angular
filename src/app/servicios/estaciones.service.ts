import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstacionModelo } from '../modelos/estacion.model';
import { SeguridadService } from './seguridad.service';
import { EstacionesRoutingModule } from '../modulos/estaciones/estaciones-routing.module';

@Injectable({
  providedIn: 'root'
})
export class EstacionesService {

  url = "http://localhost:3000"
  token: string = ''

constructor(private http: HttpClient,
  private seguridadService: SeguridadService) {
    this.token = this.seguridadService.getToken();
  }

  store(estaciones: EstacionModelo): Observable<EstacionModelo> {
    return this.http.post<EstacionModelo>(`${this.url}/estacions`, {
      nombre: estaciones.nombre,
      direccion: estaciones.direccion,
      coordenada_x: estaciones.coordenada_x,
      coordenada_y: estaciones.coordenada_y,
      tipo: estaciones.tipo
    });
  }

  getAll(): Observable<EstacionModelo[]>{
    return this.http.get<EstacionModelo[]>(`${this.url}/estacions`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(estaciones: EstacionModelo): Observable<EstacionModelo> {
    return this.http.patch<EstacionModelo>(`${this.url}/estacions/${estaciones.id}`, {
      nombre: estaciones.nombre,
      direccion: estaciones.direccion,
      coordenada_x: estaciones.coordenada_x,
      coordenada_y: estaciones.coordenada_y,
      tipo: estaciones.tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<EstacionModelo[]>{
    return this.http.delete<EstacionModelo[]>(`${this.url}/estacions/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<EstacionModelo>{
    return this.http.get<EstacionModelo>(`${this.url}/estacions/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}
