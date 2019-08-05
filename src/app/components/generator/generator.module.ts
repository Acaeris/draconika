import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './generator.component';
import { RollService } from '../../providers/roll.service';
import { TableService } from '../../providers/table.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    GeneratorRoutingModule,
    TranslateModule
  ],
  declarations: [
    GeneratorComponent
  ],
  exports: [
    GeneratorComponent
  ],
  providers: [
    RollService,
    TableService
  ]
})
export class GeneratorModule {}
