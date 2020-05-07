import { EditorService } from '../../editor.service';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
export class TopologeDto {
  public left;
  public top;
  public rigth;
  public bottom;

  public onChane$ = new Subject();

  merge() {
    /* [this.left, this.rigth,
     this.top, this.bottom] =
       [this.editorService.cursor.left, this.editorService.cursor.right,
       this.editorService.cursor.top, this.editorService.cursor.bottom];

     this.merged = true;

     this.unsubscriber.next();

     this.editorService.cursor.sheetService.cols[this.left].left
       .pipe(takeUntil(this.unsubscriber))
       .subscribe(a => this.left$.next(a));
     this.editorService.cursor.sheetService.rows[this.top].top
       .pipe(takeUntil(this.unsubscriber))
       .subscribe(a => this.top$.next(a));

     combineLatest([
       this.editorService.cursor.sheetService.cols[this.rigth].rigth,
       this.editorService.cursor.sheetService.cols[this.left].left
     ]).pipe(takeUntil(this.unsubscriber), map(([a, b]) => a - b))
       .subscribe(a => this.width$.next(a));
     combineLatest([
       this.editorService.cursor.sheetService.rows[this.bottom].bottom,
       this.editorService.cursor.sheetService.rows[this.top].top
     ])
       .pipe(takeUntil(this.unsubscriber), map(([a, b]) => a - b))
       .subscribe(a => this.height$.next(a));*/
  }

  split() {
    /*[this.left, this.rigth,
    this.top, this.bottom] =
      [this.editorService.cursor.left, this.editorService.cursor.left,
      this.editorService.cursor.top, this.editorService.cursor.top];

    this.merged = false;
    this.unsubscriber.next();

    this.editorService.cursor.sheetService.cols[this.left].left
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(a => this.left$.next(a));
    this.editorService.cursor.sheetService.rows[this.top].top
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(a => this.top$.next(a));

    this.editorService.cursor.sheetService.cols[this.rigth].width
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(a => this.width$.next(a));
    this.editorService.cursor.sheetService.rows[this.bottom].height
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(a => this.height$.next(a));*/

  }
  getData() {
  }
  constructor(
    public lc: number,
    public tr: number,
    public rc: number,
    public br: number
  ) {

  }

}
