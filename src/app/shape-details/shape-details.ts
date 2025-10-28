import { Component, inject, Input } from '@angular/core';
import { ShapeControlPanel } from '../shape-control-panel/shape-control-panel';
import { SceneManagerService, shape } from '../services/scene-manager-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shape-details',
  imports: [FormsModule],
  templateUrl: './shape-details.html',
  styleUrl: './shape-details.css',
})
export class ShapeDetails {


  controlPanel = inject(ShapeControlPanel);
  scaleValue : number = 1;

    constructor(private service : SceneManagerService){}
  

  editShape(id : number | undefined ,name : string , posX : number , posY : number , posZ : number , scale : number , color : any) {
    if (id == undefined) return ;
    this.service.editShape(id ,name , posX , posY , posZ , scale , color);
  }
  deselectShape() {
    this.controlPanel.deselectShape();
  }

}
