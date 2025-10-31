import { Component } from '@angular/core';
import { SceneManagerService, shape } from '../services/scene-manager-service';
import { CommonModule } from '@angular/common';
import { ShapeDetails } from "../shape-details/shape-details";


@Component({
  selector: 'app-shape-control-panel',
  imports: [CommonModule, ShapeDetails],
  templateUrl: './shape-control-panel.html',
  styleUrl: './shape-control-panel.css',
})
export class ShapeControlPanel {

  public selectedShape : shape | undefined = undefined;
  public isCollapsed: boolean = false;

  constructor(private service : SceneManagerService){}
  

  addShape(type : string){
    this.service.addShape(type);
    
  }
  public toggleCollapse(): void {
  this.isCollapsed = !this.isCollapsed;
}
  selectShape(id : number){
      
      this.service.selectShape(id);
      this.selectedShape = this.service.selectedShape;
      console.log(this.selectedShape?.id);
    
  }
  deselectShape(){
    this.service.deselectShape();
    this.selectedShape = this.service.selectedShape;
  }
  getInSceneShapes(){
    
    return this.service.getInSceneShapes();
  }
}
