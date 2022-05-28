import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_LOCAL } from "../gobals";
import { Education } from "../models/education";

@Injectable({
  providedIn: "root",
})
export class EducationService {

  api: string = "api/educacion/";

  constructor(private http: HttpClient) {}

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(URL_LOCAL + this.api + "listar");
  }
  createEducation(educacion: Education): Observable<Education> {
    return this.http.post<Education>(URL_LOCAL + this.api + "crear", educacion);
  }
  updateEducacion(educacion: Education): Observable<Education> {
    return this.http.put<Education>(
      URL_LOCAL + this.api + "actualizar/" + educacion.id,
      educacion
    );
  }
  deleteEducacion(id: number): Observable<any> {
    return this.http.delete<any>(URL_LOCAL + this.api + "eliminar/" + id);
  }
}
