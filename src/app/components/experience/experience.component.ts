import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Experience } from "src/app/models/experience";
import { ExperienceService } from "src/app/service/experience.service";
import { TokenService } from "src/app/service/token.service";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.css"],
})
export class ExperienceComponent implements OnInit {
  public experiences: Experience[] = [];
  public editExp: Experience;
  public deleteExp: Experience;
  roles: string[];
  isAdmin = false;

  constructor(
    private experienceService: ExperienceService,
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
        this.experienceService
          .getExperience()
          .subscribe((response) => (this.experiences = response));
      }
    });
  }

  public getExperience(): void {
    this.experienceService.getExperience().subscribe(
      (response: Experience[]) => {
        this.experiences = response;
        console.log(this.experiences);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addExperience(addForm: NgForm): void {
    document.getElementById("add-experience-form").click();
    this.experienceService.createExperience(addForm.value).subscribe(
      (response: Experience) => {
        this.getExperience();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public updateExperience(experience: Experience): void {
    this.experienceService.updateExperience(experience).subscribe(
      (response: Experience) => {
        this.getExperience();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteExperience(id: number): void {
    this.experienceService.deleteExperience(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getExperience();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openModal(experience: Experience, mode: string): void {
    const education_aux = document.getElementById("main-experience");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-target", "#addExperienceModal");
    }
    if (mode === "edit") {
      this.editExp = experience;
      button.setAttribute("data-target", "#updateExperienceModal");
    }
    if (mode === "delete") {
      this.deleteExp = experience;
      button.setAttribute("data-target", "#deleteExperienceModal");
    }
    education_aux!.appendChild(button);
    button.click();
  }
}
