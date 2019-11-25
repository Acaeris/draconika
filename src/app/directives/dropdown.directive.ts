import { Directive, ElementRef, OnInit } from '@angular/core';

declare var jQuery: any;

@Directive({ selector: '.ui.dropdown:not(.icon)'})
export class DropdownDirective implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit() { jQuery(this.el.nativeElement).dropdown(); }
}
