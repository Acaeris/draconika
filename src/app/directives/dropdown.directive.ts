import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '.ui.dropdown'})
export class DropdownDirective implements OnInit {
    constructor(private el: ElementRef) { }

    ngOnInit() { $(this.el.nativeElement).dropdown(); }
}
