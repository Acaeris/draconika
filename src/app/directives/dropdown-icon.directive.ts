import { Directive, ElementRef, OnInit } from '@angular/core';

declare var jQuery: any;

@Directive({ selector: '.ui.dropdown.icon'})
export class DropdownIconDirective implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit() { jQuery(this.el.nativeElement).dropdown({
    on: 'hover'
  }); }
}
