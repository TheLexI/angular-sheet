import { Directive, Input, ComponentFactory, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[sheetComponent]'
})
export class ComponentDirective implements OnInit {
  @Input() sheetComponent: { ref: any, fac: ComponentFactory<any> };
  constructor(
    private ref: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.sheetComponent.ref = this.ref.createComponent(this.sheetComponent.fac).instance;
  }

}
