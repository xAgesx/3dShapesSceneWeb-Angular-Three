import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { SceneViewer } from '../scene-viewer/scene-viewer';
import { abs } from 'three/tsl';

export type shape = {
  id: number,
  name: string,
  size: number,
  color: THREE.Color,
  position: { x: number, y: number, z: number }
}
@Injectable({
  providedIn: 'root'
})
export class SceneManagerService {

  scene !: THREE.Scene;
  renderer !: THREE.WebGLRenderer;
  camera !: THREE.Camera;


  inSceneShapes: shape[] = [];
  xOffset: number = 0;
  public selectedShape: shape | undefined = undefined;
  nameIndex: number = 0;

  private previousSelectedMesh: THREE.Mesh | null = null;
  previousOriginalColor: THREE.Color = new THREE.Color(0, 0, 0);

  editShape(id: number, name: string, posX: number, posY: number, posZ: number, scale: number, color: any) {
    this.selectedShape = this.inSceneShapes.find(item => item.id == id);
    if (!this.selectedShape) return;
    this.selectedShape.position.x = posX;
    this.selectedShape.position.y = posY;
    this.selectedShape.position.z = posZ;

    const mesh = this.scene.getObjectByName(this.selectedShape.name) as THREE.Mesh;
    mesh.position.x = this.selectedShape.position.x;
    mesh.position.y = this.selectedShape.position.y;
    mesh.position.z = this.selectedShape.position.z;

    (mesh.material as THREE.MeshStandardMaterial).color.set(color);
    this.selectedShape.color = color;
    mesh.scale.set(scale, scale, scale);


    this.selectedShape.name = name;
    mesh.name = name;
  }
  addShape(type: string) {
    let mesh;

    switch (type) {
      case 'cube':
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color("rgb(255, 0, 0)") })
        mesh = new THREE.Mesh(geometry, material);

        mesh.translateX(this.xOffset);



        break;

    }
    if (mesh != null) {
      this.nameIndex++;
      mesh.name = type + this.nameIndex;
      this.scene.add(mesh);

    }



    this.inSceneShapes.push({ id: this.nameIndex, name: 'cube' + this.nameIndex, size: 2, color: new THREE.Color(255, 0, 0), position: { x: this.xOffset, y: 0, z: 0 } });
    (this.xOffset >= 0) ? this.xOffset = -1 * this.xOffset - 5 : this.xOffset = -1 * this.xOffset;

    //change camera perspective if too many shapes 
    if (this.inSceneShapes.length > 1) {
      let distance = Math.abs(this.inSceneShapes[0].position.x + this.inSceneShapes[this.inSceneShapes.length - 1].position.x);
      console.log("distance : " + distance);
      console.log("window width : " + window.innerWidth / 100);

      if (distance > window.innerWidth / 100) {
        console.log("expanded");
        this.camera.position.z += 4;
      }
    }

  }
  initScene(scene: THREE.Scene) {
    this.scene = scene;
  }
  initRenderer(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
  }
  initCamera(camera: THREE.Camera) {
    this.camera = camera;
  }
  getInSceneObject() {
    if (this.scene == null || this.scene.children.length == 0) return null;
    return this.scene.children;
  }
  getInSceneShapes() {
    if (this.inSceneShapes.length == 0 || this.scene == null) return null;
    return this.inSceneShapes;
  }
  selectShape(id: number) {
    this.selectedShape = this.inSceneShapes.find(item => item.id == id);
    if (this.selectedShape) {

      const mesh = this.scene.getObjectByName(this.selectedShape.name) as THREE.Mesh;
      console.log(mesh);

      if (!this.previousSelectedMesh) {
        this.previousSelectedMesh = mesh;
        console.log(this.previousSelectedMesh);

      } else {
        const priviousShape = this.inSceneShapes.find(item => item.name == this.previousSelectedMesh?.name);
        if (priviousShape) {
          (this.previousSelectedMesh.material as THREE.MeshStandardMaterial).color.set(priviousShape.color);

        }
        this.previousSelectedMesh = mesh;
      }

      this.previousOriginalColor = (mesh.material as THREE.MeshStandardMaterial).color;

      (mesh.material as THREE.MeshStandardMaterial).color.set(new THREE.Color(255, 234, 171));
    }
    console.log(this.inSceneShapes);


  }
  deselectShape() {
    this.selectedShape = undefined;
    if (this.previousSelectedMesh) {
      (this.previousSelectedMesh.material as THREE.MeshStandardMaterial).color.set(new THREE.Color(255, 0, 0));

    }
  }

}
