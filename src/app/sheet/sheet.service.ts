import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { ColDto } from './page/dto/col-dto';
import { RowDto } from './page/dto/row-dto';
import { EditorService } from './editor.service';
import { CursorComponent } from './page/cursor/cursor.component';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  defaultWidth = 100;
  defaultHeight = 25;

  pageWidth = 100;
  pageHeight = 100;

  lastCol: ColDto = null;
  cols = new Array(this.pageWidth).fill(null).map((a, i) => this.lastCol = new ColDto(i, this.defaultWidth, this.lastCol));

  lastRow: RowDto = null;
  rows = new Array(this.pageWidth).fill(null).map((a, i) => this.lastRow = new RowDto(i, this.defaultHeight, this.lastRow));

  cursors = [this.componentFactoryResolver.resolveComponentFactory(CursorComponent)];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private editorService: EditorService
  ) { }

  command(command: { [name: string]: any }) {
    this.editorService.command$.next(command);
  }
}
