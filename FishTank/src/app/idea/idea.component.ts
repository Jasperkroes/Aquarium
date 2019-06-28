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

  /**
   * Save the new fish in the database.
   */
  saveIdea() {
    this.fishService.saveFish(this.model).subscribe();
  }

  /**
   * Varifies if the new idea is valid, and actually a new idea.
   * 
   * @param fish The fish that gets verified
   */
  verifyNewIdea(fish: Fish) {
    this.model.ideaLink;
  }
}
