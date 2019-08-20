import { Directive, ElementRef, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

@Directive({ selector: '.ui.dropdown'})
export class DropdownDirective implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit() { jQuery(this.el.nativeElement).dropdown(); }
}
