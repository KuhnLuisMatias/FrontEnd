import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Education } from "src/app/models/education";
import { EducationService } from "src/app/service/education.service";
import { TokenService } from "src/app/service/token.service";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.css"],
})
export class EducationComponent implements OnInit {
  
  public educations: Education[] = [];
  public editEducation: Education;
  public deleteEducation: Education;
  roles: string[];
  isAdmin = false;

  constructor(
    private educationService: EducationService,
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
        this.educationService
          .getEducation()
          .subscribe((response) => (this.educations = response));
      }
    });
  }

  public getEducation(): void {
    this.educationService.getEducation().subscribe(
      (response: Education[]) => {
        this.educations = response;
        console.log(this.educations);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEducacion(addForm: NgForm): void {
    document.getElementById("add-educacion-form").click();
    this.educationService.createEducation(addForm.value).subscribe(
      (response: Education) => {
        console.log(response);
        this.getEducation();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEducacion(education: Education): void {
    this.educationService.updateEducacion(education).subscribe(
      (response: Education) => {
        console.log(response);
        this.getEducation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEducacion(id: number): void {
    this.educationService.deleteEducacion(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEducation();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(education: Education, mode: string): void {
    const education_aux = document.getElementById("main-educacion");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-target", "#addEducationModal");
    }
    if (mode === "edit") {
      this.editEducation = education;
      button.setAttribute("data-target", "#updateEducationModal");
    }
    if (mode === "delete") {
      this.deleteEducation = education;
      button.setAttribute("data-target", "#deleteEducationModal");
    }
    education_aux!.appendChild(button);
    button.click();
  }
}
