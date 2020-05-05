import { SheetService } from '../../sheet.service';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { map, share, takeUntil } from 'rxjs/operators';
export class CursorDto {

  public left$ = new Subject();
  public top$ = new Subject();
  public right$ = new Subject();
  public bottom$ = new Subject();

  private unSubsctiber = new Subject();

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
    this.unSubsctiber.next();
    if (right === null) { right = left; }
    if (bottom === null) { bottom = top; }

    [left, right] = [left, right].sort();
    [top, bottom] = [top, bottom].sort();

    this.sheetService.cols[Math.min(left, right)].left.pipe(takeUntil(this.unSubsctiber)).subscribe(v => this.left$.next(v));
    this.sheetService.rows[Math.min(top, bottom)].top.pipe(takeUntil(this.unSubsctiber)).subscribe(v => this.top$.next(v));
    combineLatest([this.sheetService.cols[Math.max(left, right)].rigth, this.sheetService.cols[Math.min(left, right)].left])
      .pipe(takeUntil(this.unSubsctiber), map(([a, b]) => a - b - 2)).subscribe(a => this.right$.next(a));
    combineLatest([this.sheetService.rows[Math.max(top, bottom)].bottom, this.sheetService.rows[Math.min(top, bottom)].top])
      .pipe(takeUntil(this.unSubsctiber), map(([a, b]) => a - b - 2)).subscribe((a) => this.bottom$.next(a));
  }

}
