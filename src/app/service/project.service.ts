import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_LOCAL } from "../gobals";
import { Proyecto } from "../models/project";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  api: string = "api/proyecto/";

  constructor(private http: HttpClient) {}

  getProject(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(URL_LOCAL + this.api + "listar");
  }
  createProject(project: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(URL_LOCAL + this.api + "crear", project);
  }
  updateProject(project: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(
      URL_LOCAL + this.api + "actualizar/" + project.id,
      project
    );
  }
  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(URL_LOCAL + this.api + "eliminar/" + id);
  }
}
