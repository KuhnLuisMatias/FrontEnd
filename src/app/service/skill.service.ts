import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_LOCAL } from '../gobals';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  api: string = "api/hard_soft_skills/";

  constructor(private http: HttpClient) {}

  getSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(URL_LOCAL + this.api + "listar");
  }
  
  createSKill(about: Skill): Observable<Skill> {
    return this.http.post<Skill>(URL_LOCAL + this.api + "crear", about);
  }

  updateSkill(about: Skill): Observable<Skill> {
    return this.http.put<Skill>(
      URL_LOCAL + this.api + "update/" + about.id,
      about
    );
  }
  
  deleteSkill(id: number): Observable<any> {
    return this.http.delete<any>(URL_LOCAL + this.api + "eliminar/" + id);
  }

}