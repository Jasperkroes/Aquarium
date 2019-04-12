import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event  } from '@angular/router';
import { Fish } from '../Fish';
import { } from '../fish/fish.component';
import { FishServiceService } from '../fish-service.service';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { Target } from '@angular/compiler';

@Component({
  selector: 'app-fishinfo',
  templateUrl: './fishinfo.component.html',
  styleUrls: ['./fishinfo.component.css']
})
export class FishinfoComponent implements OnInit {

  public fish: Fish = new Fish("ooo  o0 o0 o0 oo O O O0o 0", "https://zen.myatos.net/home", "To give new ideas a better platform to be noticed on, we would like to make an aquariumlike web app.");
  public alreadyLiked: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private fishService: FishServiceService) { }

  ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.fishService.getFishById(id).subscribe(
        result => {
          this.fish = result;
        }
      );
  }

  increaseLikes() {
    this.fish.likes += 1;
    this.alreadyLiked = true;
  }

  closeOverlay(event) {
    if (this.route.snapshot.paramMap.has('id')) {
          this.router.navigateByUrl("");

    }
  }
}
