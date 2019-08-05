import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'generator', component: GeneratorComponent }
    ])
  ],
  exports: [RouterModule]
})
export class GeneratorRoutingModule {}
