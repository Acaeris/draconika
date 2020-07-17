import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DungeonMapRoutingModule } from './dungeon-map-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DungeonMapComponent } from './dungeon-map.component';

@NgModule({
  imports: [
    SharedModule,
    DungeonMapRoutingModule,
    TranslateModule
  ],
  declarations: [
    DungeonMapComponent
  ],
  exports: [
    DungeonMapComponent
  ],
  providers: []
})
export class DungeonMapModule {}
