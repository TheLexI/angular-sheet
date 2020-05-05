import { Injectable } from '@angular/core';
import { ColDto } from './page/dto/col-dto';
import { RowDto } from './page/dto/row-dto';
import { CursorDto } from './page/dto/cursor-dto';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  defaultWidth = 100;
  defaultHeight = 25;

  pageWidth = 100;
  pageHeight = 100;

  lastCol = null;
  cols = new Array(this.pageWidth).fill(null).map((a, i) => this.lastCol = new ColDto(i, this.defaultWidth, this.lastCol));

  lastRow = null;
  rows = new Array(this.pageWidth).fill(null).map((a, i) => this.lastRow = new RowDto(i, this.defaultHeight, this.lastRow));

  cursor = new CursorDto(this, 0, 0);

  constructor() { }
}
