import { SheetService } from '../../sheet.service';
import { Observable } from 'rxjs';
export class CursorDto {

  public left$: Observable<number>;
  public top$: Observable<number>;
  public right$: Observable<number>;
  public bottom$: Observable<number>;

  constructor(
    private sheetService: SheetService,
    left,
    top,
    right = null,
    bottom = null,
  ) {
    this.setCursor(left, top, right, bottom);
  }

  setCursor(left, top, right = null, bottom = null) {
    if (right === null) { right = left; }
    if (bottom === null) { bottom = top; }
    this.left$ = this.sheetService.cols[left].left;
    this.right$ = this.sheetService.cols[right].rigth;
    this.top$ = this.sheetService.rows[top].top;
    this.bottom$ = this.sheetService.rows[bottom].bottom;
  }

}
