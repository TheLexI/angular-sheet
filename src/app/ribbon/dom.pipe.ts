import { Pipe, PipeTransform, ElementRef } from '@angular/core';

@Pipe({
  name: 'dom'
})
export class DomPipe implements PipeTransform {

  constructor(private ref: ElementRef) {
  }

  transform(value: unknown, ...args: unknown[]) {
    this.ref.nativeElement.replaceWith(value);
  }

}
