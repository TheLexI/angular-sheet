import { Directive, Input, OnInit, ElementRef, HostListener } from '@angular/core';
import { SubmenuComponent } from './submenu.component';

@Directive({
  selector: '[ribbonSubmenuRef]'
})
export class SubmenuRefDirective implements OnInit {
  @Input() ribbonSubmenuRef: SubmenuComponent;
  @HostListener('click', ['$event']) click(ev) {
    console.log(ev);
  }

  constructor(private view: ElementRef) { }

  ngOnInit() {
    console.log(this.view);
  }

}
