import { Component, OnInit } from '@angular/core';
import { Fish } from '../Fish';
import { FishServiceService } from '../fish-service.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {

  model = new Fish("", "", "");

  constructor(private fishService: FishServiceService) { }

  ngOnInit() {
  }

  saveIdea() {
    this.fishService.saveFish(this.model).subscribe();
  }

  verifyNewIdea(fish: Fish) {
    this.model.ideaLink;
  }
}
