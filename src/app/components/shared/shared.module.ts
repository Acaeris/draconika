import { NgModule, ModuleWithProviders } from '@angular/core';
import { DropdownDirective } from '../../directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule
  ],
  declarations: [
    DropdownDirective
  ],
  exports: [
    DropdownDirective,
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
