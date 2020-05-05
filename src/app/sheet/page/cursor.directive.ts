import { Directive, HostListener, ElementRef } from '@angular/core';
import { SheetService } from '../sheet.service';
import { PageComponent } from './page.component';
import { Subject, fromEvent, from } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Directive({
  selector: '[sheetCursor]'
})
export class CursorDirective {

  constructor(
    private page: PageComponent,
    private sheetService: SheetService
  ) {
    const pageRef: HTMLDivElement = this.page.ref.nativeElement;
    let start = { col: 0, row: 0 };
    fromEvent(pageRef, 'mousedown').subscribe((event: MouseEvent) => {
      start = this.getCellsFromPoint(event.clientX, event.clientY);
      this.sheetService.cursor.setCursor(start.col, start.row);
      const endMove = new Subject();
      let moved = { col: 0, row: 0 };

      fromEvent(document, 'mousemove').pipe(
        takeUntil(endMove),
      ).subscribe((ev: MouseEvent) => {
        moved = this.getCellsFromPoint(ev.clientX, ev.clientY);
        this.sheetService.cursor.setCursor(start.col, start.row, moved.col, moved.row);
        console.log(ev);
        if (ev.buttons !== 1) { endMove.next(); endMove.complete(); };
      });
    });
  }

  getCellsFromPoint(x: number, y: number) {
    let col = null;
    let row = null;
    for (const element of document.elementsFromPoint(x, y)) {
      if (element.getAttribute('data-item') !== null) {
        continue;
      }
      if (element.getAttribute('col') !== null) {
        col = element.getAttribute('data-col');
        continue;
      }
      if (element.getAttribute('row') !== null) {
        row = element.getAttribute('data-row');
        continue;
      }
      if (col !== null && row !== null) {
        break;
      }
    }
    return { col, row };
  }

}
