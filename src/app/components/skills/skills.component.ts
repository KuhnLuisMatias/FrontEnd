import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Skill } from "src/app/models/skill";
import { SkillService } from "src/app/service/skill.service";
import { TokenService } from "src/app/service/token.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"],
})
export class SkillsComponent implements OnInit {  
  public skills: Skill[] = [];
  public editSkill: Skill;
  public deleteSkill_: Skill;
  cls: String;
  roles: String[];
  isAdmin = false;

  constructor(
    private skillService: SkillService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === "ROLE_ADMIN") {
        this.isAdmin = true;
      }
    });
    this.roles.forEach((rol) => {
      if (rol === "ROLE_ADMIN" || rol === "ROLE_USER") {
        this.skillService
          .getSkill()
          .subscribe((response) => (this.skills = response));

      }
    });
  }
  public getSkill(): void {
    this.skillService.getSkill().subscribe(
      (response: Skill[]) => {
        this.skills = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addSkill(addForm: NgForm): void {
    document.getElementById("add-skill-form").click();
    this.skillService.createSKill(addForm.value).subscribe(
      (response: Skill) => {
        this.getSkill();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public updateSkill(project: Skill): void {
    this.skillService.updateSkill(project).subscribe(
      (response: Skill) => {
        this.getSkill();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteSkill(id: number): void {
    this.skillService.deleteSkill(id).subscribe(
      (response: void) => {
        this.getSkill();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openModal(skill: Skill, mode: string): void {
    const skill_aux = document.getElementById("main-skill");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-target", "#addSkillModal");
    }
    if (mode === "edit") {
      this.editSkill = skill;
      button.setAttribute("data-target", "#updateSkillModal");
    }
    if (mode === "delete") {
      this.deleteSkill_ = skill;
      button.setAttribute("data-target", "#deleteSkillModal");
    }
    skill_aux!.appendChild(button);
    button.click();
  }
  
}
