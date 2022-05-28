import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Award } from "src/app/models/award";
import { AwardService } from "src/app/service/award.service";
import { TokenService } from "src/app/service/token.service";

@Component({
  selector: "app-awards",
  templateUrl: "./awards.component.html",
  styleUrls: ["./awards.component.css"],
})
export class AwardsComponent implements OnInit {
  public awards: Award[] = [];
  public editAward: Award;
  public deleteAward_: Award;
  roles: string[];
  isAdmin = false;

  constructor(
    private awardService: AwardService,
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
        this.awardService
          .getLogro()
          .subscribe((response) => (this.awards = response));
      }
    });
  }

  public getAward(): void {
    this.awardService.getLogro().subscribe(
      (response: Award[]) => {
        this.awards = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public createAward(addForm: NgForm): void {
    document.getElementById("add-award-form").click();
    this.awardService.createLogro(addForm.value).subscribe(
      (response: Award) => {
        this.getAward();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public updateAward(award: Award): void {
    this.awardService.updateLogro(award).subscribe(
      (response: Award) => {
        this.getAward();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteAward(id: number): void {
    this.awardService.deleteLogro(id).subscribe(
      (response: void) => {
        this.getAward();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(award: Award, mode: string): void {
    const award_aux = document.getElementById("main-award");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-target", "#addAwardModal");
    }
    if (mode === "edit") {
      this.editAward = award;
      button.setAttribute("data-target", "#updateAwardModal");
    }
    if (mode === "delete") {
      this.deleteAward_ = award;
      button.setAttribute("data-target", "#deleteAwardModal");
    }
    award_aux!.appendChild(button);
    button.click();
  }
}
