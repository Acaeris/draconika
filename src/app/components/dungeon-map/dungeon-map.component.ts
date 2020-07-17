import { Component, OnInit } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-dungeon-map',
  templateUrl: './dungeon-map.component.html',
  styleUrls: ['./dungeon-map.component.scss']
})
export class DungeonMapComponent implements OnInit {
  private stage: Konva.Stage;
  private mapLayer: Konva.Layer;

  ngOnInit() {
    this.stage = new Konva.Stage({
      container: 'konva',
      width: 1050,
      height: 1350
    });

    this.mapLayer = new Konva.Layer();
  }
}
