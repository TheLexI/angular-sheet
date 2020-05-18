import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sheetContentRefsheetContentRef]'
})
export class ContentRefDirective {

  constructor(
    public ref: ViewContainerRef
  ) { }

}
