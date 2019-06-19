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

  private getAllFishes() {
    this.fishService.getAllFishes().subscribe(
      result => {
        this.fishes = result;
      }
    );
  }

  showFishPage(id: number) {
    this.router.navigateByUrl("/fishinfo/"+id);
  }

  public getImage(id: number): string {
    if (id % 3 == 0) {
      return "http://greaterclevelandaquarium.com/wp-content/uploads/2018/07/Sailfin-Tang_outline-1.png";
    } else if (id % 3 == 1) {
      return "https://i.pinimg.com/originals/9a/1a/16/9a1a1601fd0852fc6ea1881f24621a92.png";
    } else {
      return "https://pics.clipartpng.com/Clown_fish_PNG_Clipart-430.png";
    }
  }

}
