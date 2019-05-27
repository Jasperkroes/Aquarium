import { Component, OnInit, Input } from '@angular/core';
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
    //simple rotation
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
    var deltax = 3 * (Math.random() - 0.5);
    var deltay = 3 * (Math.random() - 0.5);
    var deltaz = 3 * (Math.random() - 0.5);

    var tempPos = fish.position;
    fish.position.addVectors(tempPos, new Vector3(deltax, deltay, deltaz));
    
    if (this.inbounds(tempPos)) {
      fish.position.set(tempPos.x, tempPos.y, tempPos.z);
    } else {
      fish.position.set(-tempPos.x, -tempPos.y, -tempPos.z);
    }
  }

  /**
   * Checks whether vector is somewhere on the screen.
   * 
   * @param vector the vector to be checked
   * @returns true iff the vector is not on the screen
   */
  private inbounds(vector: Vector3): boolean {
    var copy = new Vector3();
    copy.copy(vector);
    copy.project(this.camera);

    if (copy.y > 1 || copy.y < -1 || copy.x > 1 || copy.x < -1) {
      return false;
    }
    return true;
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

    /**
     * Create a simple fish mesh.
     **/
    var createFishMesh = function (fish: Fish, texture: Texture, scene: THREE.Scene, targetList: THREE.Mesh[]) {
      var fishGeometry = new THREE.SphereGeometry(8, 30, 20);

      // Create a wireframe material that's blueish
      var fishMeshMaterial = new THREE.MeshBasicMaterial({ map: texture, flatShading: true });

      var fishMesh: THREE.Mesh = new THREE.Mesh(fishGeometry, fishMeshMaterial);

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
      //Create a simple mesh
      new TextureLoader().load("https://media.discordapp.net/attachments/545539481239814165/577861279591563264/Blue-Penguin-Globe.png", onLoad)

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
    var paras = document.getElementsByClassName("animatedFish");

    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }
    this.router.navigateByUrl("/fishinfo/" + id);
  }

  private calculateTexture(fish: Fish): THREE.Color {
    var color = new THREE.Color(0xff1394);
    if (fish.id > 2) {
      color.setHex(0x0066a1);
    }
    return color;
  }
}
