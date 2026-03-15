import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Estado = 'nuevo' | 'en progreso' | 'completado';

export interface Solicitud1 {
  _id?: string;
  nombreCliente: string;
  email: string;
  empresa?: string;
  servicio: string;
  mensaje?: string;
  estado: Estado;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  // private apiUrl = 'crud-proyecto-bit-production.up.railway.app/api/solicitud';

private apiUrl = 'https://crud-proyecto-bit-production.up.railway.app/api/solicitud';
  // private apiUrl = 'http://localhost:3000/api/solicitud';

  constructor(private http: HttpClient) {}

  getSolicitudes(): Observable<Solicitud1[]> {
    return this.http.get<Solicitud1[]>(this.apiUrl);
  }

  createSolicitud(solicitud: Solicitud1): Observable<Solicitud1> {
    return this.http.post<Solicitud1>(this.apiUrl, solicitud);
  }

  updateSolicitud(id: string, solicitud: Solicitud1): Observable<Solicitud1> {
    return this.http.put<Solicitud1>(`${this.apiUrl}/${id}`, solicitud);
  }

  deleteSolicitud(id: string): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${id}`);
  }
}