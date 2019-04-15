import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three';
import { Fish } from '../Fish';
import { Router } from '@angular/router';
import { Mesh, Raycaster, Vector3 } from 'three';


@Component({
  selector: 'app-animated-fish',
  templateUrl: './animated-fish.component.html',
  styleUrls: ['./animated-fish.component.css']
})
export class AnimatedFishComponent implements OnInit {

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  targetList: THREE.Mesh[] = [];

  @Input() fishes: Fish[];

  //fishImage = require('../../assets/images/Facebook_like_thumb.png');

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.fishes);
    this.initScene();
  }

  start() {
    this.render();
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);

    //animate the fish
    this.scene.children.forEach((obj: Mesh) => {
      this.animateScene(obj);
    })

  }

  animateScene(mesh: Mesh) {
    const fish = mesh;
    const speed: number = 0.3
    //simple rotation
    fish.rotation.x += (Math.PI / 180) * speed;
    fish.rotation.y += (Math.PI / 180) * speed;
    fish.rotation.z += (Math.PI / 180) * speed;

  }

  initScene(): void {

    //Create a scene
    this.scene = new THREE.Scene();

    //Create the renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(100, 100);
    this.renderer.setClearAlpha(0);

    //Create a camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.set(0, 0, -20);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.fishes.forEach((fish: Fish) => {
      //Create a simple mesh
      var mesh = this.createFishMesh();

      //add eventlistener to the renderer
      //on click the fish info page is shown
//      mesh.addEventListener("click", () => this.showFishInfoPage(fish.id));
      mesh.name = ""+fish.id;

      //add the mesh to the scene
      this.scene.add(mesh);
      this.targetList.push(mesh);
    });



    //add a light to the scene
    this.scene.add(new THREE.AmbientLight(new THREE.Color(0x000)));


    this.renderer.domElement.className = "animatedFish";

    //TODO: dont put renderer as a child to the tank but put it in this component.
    //add renderer to the tank
    document.getElementById("tank").appendChild(this.renderer.domElement);


    document.getElementById("tank").addEventListener('click', (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = - (event.clientY / window.innerHeight) * 2 + 1;
         
      const raycaster = new Raycaster();
      raycaster.setFromCamera({ x, y }, this.camera);
      const intersections = raycaster.intersectObjects(this.targetList);

      if (intersections.length > 0) {
        this.showFishInfoPage(intersections[0].object.name);
      }


    }, false);

    //render the scene
    this.renderer.render(this.scene, this.camera);

    //start the render loop
    this.start();
  }

  /**
   * Create a simple fish mesh.
   **/
  createFishMesh(): THREE.Mesh {

    var fishGeometry = new THREE.SphereGeometry(5);

    // instantiate a loader
    var loader = new THREE.TextureLoader();

    // Create a wireframe material that's blueish
    var fishMeshMaterial = new THREE.MeshBasicMaterial(
      { color: 0x7777ff, wireframe: true });

    var fishMesh: THREE.Mesh = new THREE.Mesh(fishGeometry, fishMeshMaterial);

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

  private showFishInfoPage(id: string) {
    var paras = document.getElementsByClassName("animatedFish");

    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }​
    this.router.navigateByUrl("/fishinfo/" + id);
  }
}
