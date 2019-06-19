import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as THREE from 'three';
import { Fish } from '../Fish';
import { Router } from '@angular/router';
import { Mesh, Raycaster, Vector3, Texture, Scene } from 'three';
import { TextureLoader } from 'three';


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
  @Input() fishid: number;
  @Output() fishidChange = new EventEmitter<number>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.initScene();
  }

  /**
   * Start the render process.
   */
  start() {
    this.render();
  }

  /**
   * Render the scene every frame.
   */
  render() {
    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);

    //don't animte whenever the fishes are not visible
    //this happens when a fish is clicked on, thus when this.fishid > 0
    if(this.fishid < 0) {
      //animate the fish
      this.scene.children.forEach((obj: Mesh) => {
        this.animateScene(obj);
      })
    }

  }

  /**
   * Animate a mesh.
   * @param mesh the mesh to be animated.
   */
  animateScene(mesh: Mesh) {
    const fish = mesh;
    this.swim(fish);
  }

  /**
   * Move a mesh to a new position in the x,y,z-plane according to the swmming algorithm.
   * 
   * @param fish the Mesh that will swim
   */
  swim(fish: Mesh) {
    var direction = fish.rotation.z + Math.PI;
    if (fish.rotation.y >= Math.PI) {
      direction += Math.PI - 2*fish.rotation.z;

    }
    var speed = 0.38222232;
    var dir = Math.random();
    var deltax = speed * dir * Math.cos(direction);
    var deltay = speed * dir * Math.sin(direction);
    var deltaz = 0.00003 * (Math.random() - 0.5);

    var tempPos = fish.position;
    fish.position.addVectors(tempPos, new Vector3(deltax, deltay, deltaz));

    var inbound = this.inbounds(tempPos, fish);
    if (inbound == 0) {
      fish.position.set(tempPos.x, tempPos.y, tempPos.z);
    } else {
      
      fish.rotation.z = -direction + inbound * Math.PI;
      //get the fish's eye where it belongs
      //fish.rotateY(Math.PI * inbound);
      //fish.position.set(-tempPos.x, -tempPos.y, -tempPos.z);
      //fish.rotation.z = fish.rotation.z * Math.cos(-direction + inbound * Math.PI) - fish.rotation.x * Math.sin(-direction + inbound * Math.PI);
      //fish.rotation.x = fish.rotation.z * Math.sin(-direction + inbound * Math.PI) + fish.rotation.x * Math.cos(-direction + inbound * Math.PI);
    }

    fish.rotation.z -= Math.PI * (Math.random() - 0.5) * 0.008;

  }

  /**
   * Checks whether vector is somewhere on the screen.
   * 
   * @param vector the vector to be checked
   * @returns 0 if inbounds, 1 if out of bounds at top, 2 if out of bounds at right, 3 if out of bounds at bottom, 4 if out of bound at left
   */
  private inbounds(vector: Vector3, fish: Mesh): number {
    var copy = new Vector3();
    copy.copy(vector);
    copy.project(this.camera);

    if (copy.y > 1) { //top
      fish.position.y -= 1;
      return 1;
    } else if (copy.x > 1) { //right
      fish.position.x += 1;
      return 2;
    } else if (copy.y < -1) {  //bottom
      fish.position.y += 1;
      return 3;
    } else if (copy.x < -1) { //left
      fish.position.x -= 1;
      return 4;
    }

    return 0; //inbounds
  }

  /**
   * Initialize the scene/renderer/camera/fishes.
   */
  initScene(): void {

    //Create a scene
    this.scene = new THREE.Scene();

    //Create the renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearAlpha(0);

    //Create a camera
    this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
    this.camera.position.set(0, 0, -200);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    //add a light to the scene
    this.scene.add(new THREE.AmbientLight(new THREE.Color(0x000)));

    //Calculate the color of a fish.
    var calculateColor = function(fish: Fish): number { 
      var color = 0x0061aa;
      if (fish.likes > 5) {
        color = 0xff1394;
      }
      return color;
    }

    //Creates a mesh for a fish
    var createFishMesh = function (fish: Fish, texture: Texture, scene: THREE.Scene, targetList: THREE.Mesh[]) {
      //var fishGeometry = new THREE.SphereGeometry(8, 30, 20);
      var fishGeometry = new THREE.PlaneGeometry(30, 15, 2, 2);
      var fishColor = calculateColor(fish);
      // Create a wireframe material that's blueish
      var fishMeshMaterial = new THREE.MeshBasicMaterial({ map: texture, color: fishColor, transparent: true, side: THREE.DoubleSide });

      var fishMesh = new THREE.Mesh(fishGeometry, fishMeshMaterial);

      //Y-plane rotation is adjusted to be able to see the front of the images
      if (Math.random() > 0.5) {
        fishMesh.rotation.z += Math.PI;
      }
      //give the fish a name (used for routing)
      fishMesh.name = "" + fish.id;

      //add the fishmesh to the scene
      scene.add(fishMesh);
      targetList.push(fishMesh);
    }

    //Create fishes
    this.fishes.forEach((fish: Fish) => {
      var scene = this.scene;
      var targetList = this.targetList;

      var onLoad = function (texture: THREE.Texture) {
        createFishMesh(fish, texture, scene, targetList);
      }
      //Create a simple fish mesh after the image has been loaded      
      new TextureLoader().load("https://media.discordapp.net/attachments/545539481239814165/582894228720451595/imageedit_5_9453553192.png", onLoad)

    });

    //the animated fish class makes it so that the fishes wont duplicate themselves.
    //the center-screen class will make sure that the entire screen is used.
    this.renderer.domElement.className = "animatedFish center-screen";

    //add renderer to the tank
    document.getElementById("tank").appendChild(this.renderer.domElement);

    //Add an eventlistener to the tank. When a fish is clicked it will show its information.
    document.getElementById("tank").addEventListener('click', (event) => {

      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = - (event.clientY / window.innerHeight) * 2 + 1;

      //cast a ray from the camera towards the mouse position
      const raycaster = new Raycaster();
      raycaster.setFromCamera({ x, y }, this.camera);

      //Get all meshes (fishes) under the mouse.
      const intersections = raycaster.intersectObjects(this.targetList);

      //take the nearest (z-plane) intersecting fish and show its information
      if (intersections.length > 0) {
        this.showFishInfoPage(intersections[0].object.name);
      }
    }, false);

    //render the initial scene
    this.renderer.render(this.scene, this.camera);

    //start the render loop
    this.start();
  }

  /**
   * Navigate to a page that shows the information of the fish with id :id.
   * 
   * @param id a string of the id of the fish. 
   */
  private showFishInfoPage(id: string) {
  //  var paras = document.getElementsByClassName("animatedFish");

    //while (paras[0]) {
      //paras[0].parentNode.removeChild(paras[0]);
    //}
    console.log("Pausing swimming.");
    this.fishid = Number.parseInt(id);
    this.fishidChange.emit(this.fishid);

    //cancelAnimationFrame(this.requestAnimationId);

    //this.render();
    //this.fishClicked = true;
    //this.router.navigateByUrl("/fishinfo/" + id);
  }
}
