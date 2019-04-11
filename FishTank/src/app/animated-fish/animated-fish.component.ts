import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three';
import { Fish } from '../Fish';

@Component({
  selector: 'app-animated-fish',
  templateUrl: './animated-fish.component.html',
  styleUrls: ['./animated-fish.component.css']
})
export class AnimatedFishComponent implements OnInit {

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;

  @Input() fish: Fish;

  fishImage = require('../../assets/images/Facebook_like_thumb.png');

  constructor() {
  }

  start() {
    this.render();
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);
  }

  ngOnInit(): void {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(100, 100);
    this.renderer.setClearAlpha(0);
   
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.set(0, 0, -20);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    var fishGeometry = this.createFishMesh();

    fishGeometry.position.set(0, 0, 0);

    this.scene.add(fishGeometry);
    this.scene.add(new THREE.AmbientLight(new THREE.Color(0x000)));
    //this.renderer.domElement.onclick(new Router().navigateByUrl("/fishinfo/" + this.fish.id));
    document.getElementById('tank').appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
    this.start();
  }

  createFishMesh(): THREE.Mesh {

    var fishGeometry = new THREE.SphereGeometry(5);

    // instantiate a loader
    var loader = new THREE.TextureLoader();

    // Create a wireframe material that's blueish
    var fishMeshMaterial = new THREE.MeshBasicMaterial(
      { color: 0x7777ff, wireframe: true });

    var fishMesh: THREE.Mesh = new THREE.Mesh();
    THREE.Mesh.call(fishMesh, fishGeometry, fishMeshMaterial);

    return fishMesh;
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
