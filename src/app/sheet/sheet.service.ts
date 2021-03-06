import { Injectable, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { ColDto } from './page/dto/col-dto';
import { RowDto } from './page/dto/row-dto';
import { CursorComponent } from './page/cursor/cursor.component';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private sheetService;

  defaultWidth = 100;
  defaultHeight = 25;

  pageWidth = 100;
  pageHeight = 100;

  lastCol: ColDto = null;
  cols = new Array(this.pageWidth).fill(null).map((a, i) => this.lastCol = new ColDto(i, this.defaultWidth, this.lastCol));

  lastRow: RowDto = null;
  rows = new Array(this.pageWidth).fill(null).map((a, i) => this.lastRow = new RowDto(i, this.defaultHeight, this.lastRow));

  cursors: { ref: CursorComponent; fac: ComponentFactory<CursorComponent> }[] = [
    {
      ref: null,
      fac: this.componentFactoryResolver.resolveComponentFactory(CursorComponent)
    }
  ];

  inject(pageComponent: any) {
    this.sheetService = pageComponent.sheetService;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

}
