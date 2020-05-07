import { Directive, Input, HostBinding, ElementRef } from '@angular/core';
import { TopologeDto } from './dto/topologe-dto';

@Directive({
  selector: '[sheetTopologe]'
})
export class TopologeDirective {
  @Input() sheetTopologe: TopologeDto;

  @HostBinding('style.zIndex') zIndex = 0;

  constructor(
    private ref: ElementRef
  ) {
    ref.nativeElement.topologe = this;
  }

}
