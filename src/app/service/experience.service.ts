import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_LOCAL } from "../gobals";
import { Experience } from "../models/experience";

@Injectable({
  providedIn: "root",
})
export class ExperienceService {
  api: string = "api/experiencia/";

  constructor(private http: HttpClient) {}

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(URL_LOCAL + this.api + "listar");
  }
  createExperience(educacion: Experience): Observable<Experience> {
    return this.http.post<Experience>(
      URL_LOCAL + this.api + "crear",
      educacion
    );
  }
  updateExperience(educacion: Experience): Observable<Experience> {
    return this.http.put<Experience>(
      URL_LOCAL + this.api + "actualizar/" + educacion.id,
      educacion
    );
  }
  deleteExperience(id: number): Observable<any> {
    return this.http.delete<any>(URL_LOCAL + this.api + "eliminar/" + id);
  }
}
