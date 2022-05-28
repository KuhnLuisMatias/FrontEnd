import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_LOCAL } from "../gobals";
import { About } from "../models/about";

@Injectable({
  providedIn: "root",
})
export class AboutService {
  api: string = "api/about/";

  constructor(private http: HttpClient) {}

  getAbout(): Observable<About[]> {
    return this.http.get<About[]>(URL_LOCAL + this.api + "listar");
  }
  createAbout(about: About): Observable<About> {
    return this.http.post<About>(URL_LOCAL + this.api + "crear", about);
  }
  updateAbout(about: About): Observable<About> {
    return this.http.put<About>(
      URL_LOCAL + this.api + "update/" + about.id,
      about
    );
  }
  deleteAbout(id: number): Observable<any> {
    return this.http.delete<any>(URL_LOCAL + this.api + "eliminar/" + id);
  }
}
