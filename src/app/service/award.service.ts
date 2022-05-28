import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_LOCAL } from '../gobals';
import { Award } from '../models/award';

@Injectable({
  providedIn: 'root'
})
export class AwardService {

  api: string = "api/logro/";

  constructor(private http: HttpClient) {}

  getLogro(): Observable<Award[]> {
    return this.http.get<Award[]>(URL_LOCAL + this.api + "listar");
  }
  createLogro(educacion: Award): Observable<Award> {
    return this.http.post<Award>(URL_LOCAL + this.api + "crear", educacion);
  }
  updateLogro(educacion: Award): Observable<Award> {
    return this.http.put<Award>(
      URL_LOCAL + this.api + "actualizar/" + educacion.id,
      educacion
    );
  }
  deleteLogro(id: number): Observable<any> {
    return this.http.delete<any>(URL_LOCAL + this.api + "eliminar/" + id);
  }
}
