import { Component, Input, OnInit } from "@angular/core";
import { Skill } from "src/app/models/skill";

@Component({
  selector: "app-skill-item",
  templateUrl: "./skill-item.component.html",
  styleUrls: ["./skill-item.component.css"],
})
export class SkillItemComponent implements OnInit {
  
  @Input() skill: Skill = new Skill();
  skill_: Skill = this.skill;

  constructor() {}

  ngOnInit() {    
  }

}
