import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutaModelo } from '../modelos/ruta.model';
import { SeguridadService } from './seguridad.service';
import { RutasRoutingModule } from '../modulos/rutas/rutas-routing.module';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  url = "http://localhost:3000"
  token: string = ''

constructor(private http: HttpClient,
  private seguridadService: SeguridadService) {
    this.token = this.seguridadService.getToken();
  }

  store(ruta: RutaModelo): Observable<RutaModelo> {
    return this.http.post<RutaModelo>(`${this.url}/rutas`, {
      tiempo_estimado: ruta.tiempo_estimado,
      origen: ruta.origen,
      destino: ruta.destino
    });
  }

  getAll(): Observable<RutaModelo[]>{
    return this.http.get<RutaModelo[]>(`${this.url}/rutas`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(ruta: RutaModelo): Observable<RutaModelo> {
    return this.http.patch<RutaModelo>(`${this.url}/rutas/${ruta.id}`, {
      tiempo_estimado: ruta.tiempo_estimado,
      origen: ruta.origen,
      destino: ruta.destino
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<RutaModelo[]>{
    return this.http.delete<RutaModelo[]>(`${this.url}/rutas/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<RutaModelo>{
    return this.http.get<RutaModelo>(`${this.url}/rutas/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}
