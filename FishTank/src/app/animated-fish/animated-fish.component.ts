import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-animated-fish',
  templateUrl: './animated-fish.component.html',
  styleUrls: ['./animated-fish.component.css']
})
export class AnimatedFishComponent implements OnInit {
  renderer: THREE.WebGLRenderer;

  constructor() {
  }

  start() {
    this.renderer.clear();
  }

  ngOnInit(): void {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(100, 100);
    this.renderer.setClearColor(0xFF0000, 1);
    document.getElementById('content').appendChild(this.renderer.domElement);
    this.start();
  }
}
