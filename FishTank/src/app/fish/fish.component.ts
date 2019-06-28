import { Component, OnInit } from '@angular/core';
import { Fish } from '../Fish';
import { Router } from '@angular/router';
import { FishServiceService } from '../fish-service.service';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.css']
})
export class FishComponent implements OnInit {

  public fishes: Fish[];

  clickedFishId: number = -1;

  constructor(private router: Router, private fishService: FishServiceService) { }

  ngOnInit() {
    this.getAllFishes();
  }

  /**
   * Get all the fishes from the database and save them in this.fishes.
   */
  private getAllFishes() {
    this.fishService.getAllFishes().subscribe(
      result => {
        this.fishes = result;
      }
    );
  }

  /**
   * Show the information of the fish with id.
   * 
   * @param id the id of the fish, whose information will be shown
   */
  showFishPage(id: number) {
    this.router.navigateByUrl("/fishinfo/"+id);
  }

}
