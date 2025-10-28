import { Component, inject, Input } from '@angular/core';
import { ShapeControlPanel } from '../shape-control-panel/shape-control-panel';
import { SceneManagerService, shape } from '../services/scene-manager-service';

@Component({
  selector: 'app-shape-details',
  imports: [],
  templateUrl: './shape-details.html',
  styleUrl: './shape-details.css',
})
export class ShapeDetails {


  controlPanel = inject(ShapeControlPanel);

    constructor(private service : SceneManagerService){}
  

  editShape(id : number | undefined ,name : string , posX : number , posY : number , posZ : number) {
    if (id == undefined) return ;
    this.service.editShape(id ,name , posX , posY , posZ);
  }
  deselectShape() {
    this.controlPanel.deselectShape();
  }

}
