import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Fish } from '../Fish';
import { FishServiceService } from '../fish-service.service';

@Component({
  selector: 'app-fishinfo',
  templateUrl: './fishinfo.component.html',
  styleUrls: ['./fishinfo.component.css']
})
export class FishinfoComponent implements OnInit {
  @Input() fishid: number;
  @Output() fishidChange = new EventEmitter<number>();

  public fish: Fish = new Fish("400: Not Found", "", "The fish with id: " + this.fishid + " could not be found in the database.");
  public alreadyLiked: boolean = false;

  constructor(private fishService: FishServiceService) { }

  ngOnInit() {
    //retrieve the correct fish from the database.
    this.fishService.getFishById(this.fishid).subscribe(
      result => {
        this.fish = result;
      }
    );
  }

  /**
   * Increase the active fish's likes by one.
   */
  increaseLikes() {
    this.alreadyLiked = true;
    //increase the likes of the current fish by one
    this.fishService.increaseLikes(this.fish.id).subscribe(result => {
      if (result.likes > 0) {
        this.fish = result;
      }
    });
  }

  /**
   * Close the information overlay.
   */
  closeOverlay() {
    console.log("Closing the overlay")

    //notify parent that the fish information has been closed.
    this.fishid = -1;
    this.fishidChange.emit(this.fishid);
  }
}
