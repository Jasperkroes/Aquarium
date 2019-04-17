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

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.fishes);
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

    //animate the fish
    this.scene.children.forEach((obj: Mesh) => {
      this.animateScene(obj);
    })

  }

  /**
   * Animate a mesh.
   * @param mesh the mesh to be animated.
   */
  animateScene(mesh: Mesh) {
    const fish = mesh;
    //const speed: number = 0.3
    ////simple rotation
    //fish.rotation.x += (Math.PI / 180) * speed;
    //fish.rotation.y += (Math.PI / 180) * speed;
    //fish.rotation.z += (Math.PI / 180) * speed;

    if (Math.random() < 0.3) {
      this.swim(fish);
    }
  }

  /**
   * Move a mesh to a new position in the x,y,z-plane according to the swmming algorithm.
   * 
   * @param fish the Mesh that will swim
   */
  swim(fish: Mesh) {
    fish.position.x += 1.5 * (Math.random() - 0.5);
    fish.position.y += 1.5 * (Math.random() - 0.5);
    fish.position.z += 1.5 * (Math.random() - 0.5);
  }

  /**
   * Initialize the scene/renderer/camera/fishes.
   */
  initScene(): void {

    //Create a scene
    this.scene = new THREE.Scene();

    //Create the renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(screen.availWidth, screen.availHeight);
    this.renderer.setClearAlpha(0);

    //Create a camera
    this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, -200);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    //Create fishes
    this.fishes.forEach((fish: Fish) => {
      //Create a simple mesh
      var mesh = this.createFishMesh();

      mesh.name = ""+fish.id;

      //add the fishmesh to the scene
      this.scene.add(mesh);
      this.targetList.push(mesh);
    });

    //add a light to the scene
    this.scene.add(new THREE.AmbientLight(new THREE.Color(0x000)));

    //the animated fish class makes it so that the fishes wont duplicate themselves.
    //the center-screen class will make sure that the entire screen is used.
    this.renderer.domElement.className = "animatedFish center-screen";

    //add renderer to the tank
    document.getElementById("tank").appendChild(this.renderer.domElement);

    //Add an eventlistener to the tank. When a fish is clicked it will sow its information.
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
   * Create a simple fish mesh.
   **/
  createFishMesh(): THREE.Mesh {

    var fishGeometry = new THREE.SphereGeometry(8, 30, 20);
    
    // instantiate a loader
    var loader = new THREE.TextureLoader();

    // Create a wireframe material that's blueish
    var fishMeshMaterial = new THREE.MeshNormalMaterial();

    var fishMesh: THREE.Mesh = new THREE.Mesh(fishGeometry, fishMeshMaterial);

    return fishMesh;
  }

  /**
   * Navigate to a page that shows the information of the fish with id :id.
   * 
   * @param id a string of the id of the fish. 
   */
  private showFishInfoPage(id: string) {
    var paras = document.getElementsByClassName("animatedFish");

    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }​
    this.router.navigateByUrl("/fishinfo/" + id);
  }
}
