import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DungeonMapComponent } from './dungeon-map.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'dungeon-map', component: DungeonMapComponent }
    ])
  ],
  exports: [RouterModule]
})
export class DungeonMapRoutingModule {}
