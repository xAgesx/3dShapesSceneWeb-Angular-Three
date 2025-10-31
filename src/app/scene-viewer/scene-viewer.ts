import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import * as THREE from 'three';
import { threshold } from 'three/src/nodes/TSL.js';
import { ShapeControlPanel } from "../shape-control-panel/shape-control-panel";
import { SceneManagerService } from '../services/scene-manager-service';
import { ShapeDetails } from "../shape-details/shape-details";
import { directPointLight } from 'three/tsl';
import { rgbShift } from 'three/examples/jsm/tsl/display/RGBShiftNode.js';

@Component({
  selector: 'app-scene-viewer',
  imports: [ShapeControlPanel, ShapeDetails],
  templateUrl: './scene-viewer.html',
  styleUrl: './scene-viewer.css',
})
export class SceneViewer {
  @ViewChild('SceneContainer')container!: ElementRef;
  public scene !: THREE.Scene ;

  constructor(private service : SceneManagerService){}

  ngAfterViewInit(){
  this.scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth-30, window.innerHeight-40);
    this.container.nativeElement.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(new THREE.Color('rgba(255, 255, 255, 1)'),0.2);
    this.scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(new THREE.Color('rgb(255,255,255)'),1);
    dirLight.position.set(5,5,0);
    this.scene.add(dirLight);

  renderer.render(this.scene, camera);
  camera.position.z = 15;
  this.service.initScene(this.scene);
  this.service.initRenderer(renderer);
  this.service.initCamera(camera);

  const animate = () => {
      requestAnimationFrame(animate);
      let objects = this.service.getInSceneObject();
      if(objects != null){
          objects.forEach(element => {
            element.rotation.x += 0.01;
            element.rotation.y += 0.01;
      });
      }
      
      renderer.render(this.scene, camera);
    }
    animate();
}

}
