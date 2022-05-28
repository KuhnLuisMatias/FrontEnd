import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Proyecto } from "src/app/models/project";
import { ProjectService } from "src/app/service/project.service";
import { TokenService } from "src/app/service/token.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
  public projects: Proyecto[] = [];
  public editProj: Proyecto;
  public deleteProj: Proyecto;
  roles: string[];
  isAdmin = false;

  constructor(
    private projectService: ProjectService,
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
        this.projectService
          .getProject()
          .subscribe((response) => (this.projects = response));
      }
    });
  }

  public getProject(): void {
    this.projectService.getProject().subscribe(
      (response: Proyecto[]) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addProject(addForm: NgForm): void {
    document.getElementById("add-project-form").click();
    this.projectService.createProject(addForm.value).subscribe(
      (response: Proyecto) => {
        this.getProject();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public updateProject(project: Proyecto): void {
    this.projectService.updateProject(project).subscribe(
      (response: Proyecto) => {
        this.getProject();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(
      (response: void) => {
        this.getProject();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openModal(project: Proyecto, mode: string): void {
    const education_aux = document.getElementById("main-project");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-target", "#addProjectModal");
    }
    if (mode === "edit") {
      this.editProj = project;
      button.setAttribute("data-target", "#updateProjectModal");
    }
    if (mode === "delete") {
      this.deleteProj = project;
      button.setAttribute("data-target", "#deleteProjectModal");
    }
    education_aux!.appendChild(button);
    button.click();
  }
}
