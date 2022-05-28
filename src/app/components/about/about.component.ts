import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/service/about.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  public persons: About[] = [];
  public editPerson: About;
  public deletePerson: About;
  roles: string[];
  rol:string;
  isAdmin = false;

  constructor( private aboutService: AboutService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === "ROLE_ADMIN") {
        this.isAdmin = true;
      }
    });

    this.roles.forEach((rol) => {
      if (rol === "ROLE_ADMIN" || rol === "ROLE_USER") {
        this.aboutService
          .getAbout()
          .subscribe((response) => (this.persons = response));
          this.rol = rol;
      }
    });
  }

  
  public getAbout(): void {
    this.aboutService.getAbout().subscribe(
      (response: About[]) => {
        this.persons = response;        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAbout(addForm: NgForm): void{
    document.getElementById("add-about-form").click();
    this.aboutService.createAbout(addForm.value).subscribe(
      (response: About) =>{        
        this.getAbout();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
      }
    );
  }
  
  public onUpdateAbout(about: About): void{
    this.aboutService.updateAbout(about).subscribe(
      (response: About) =>{        
        this.getAbout();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onDeleteEducation(id: number):void{
    this.aboutService.deleteAbout(id).subscribe(
      (response: void) => {        
        this.getAbout();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public onOpenModal(about: About,mode: String): void{

    const about_aux = document.getElementById("main-about");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle","modal");
    
    if(mode === "add"){
      button.setAttribute("data-target","#addAboutModal");
    }

    if(mode === "edit"){
      this.editPerson = about;
      button.setAttribute("data-target","#editAboutModal");
    }

    if(mode === "delete"){
      this.deletePerson = about;
      button.setAttribute("data-target","#deleteAboutModal");
    }

    about_aux!.appendChild(button);
    button.click();
  }
}
