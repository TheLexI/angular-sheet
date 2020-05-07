import { Directive, Input, ComponentFactory, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[sheetComponent]'
})
export class ComponentDirective implements OnInit {
  @Input() sheetComponent: ComponentFactory<any>;
  constructor(
    private ref: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.ref.createComponent(this.sheetComponent);
  }

}
