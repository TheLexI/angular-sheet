import { Component, OnInit, HostBinding, ChangeDetectorRef, HostListener } from '@angular/core';
import { PageComponent } from '../page.component';
import { fromEvent, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { takeUntil, map, pairwise, startWith, filter } from 'rxjs/operators';
import { TopologeDto } from '../dto/topologe-dto';
import { EditorService } from '../../editor.service';
import { SheetService } from '../../sheet.service';
import { Command } from 'protractor';
import { Control } from '../../controls/controls';

@Component({
  selector: 'sheet-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {

  left$ = new BehaviorSubject(0);
  top$ = new BehaviorSubject(0);
  width$ = new BehaviorSubject(0);
  height$ = new BehaviorSubject(0);

  @HostBinding('style.left.px') left;
  @HostBinding('style.top.px') top;
  @HostBinding('style.width.px') width;
  @HostBinding('style.height.px') height;

  private selectionMatrix = { cols: [], rows: [] };
  private unsubscriber = new Subject();
  private sheetService: SheetService;
  private editorService: EditorService;

  public lc = 0;
  public rc = 0;
  public tr = 0;
  public br = 0;
  /*
    - Зависит от
      - топологии
      - листа
      - строк
      - столбцов
  */
  constructor(
    private pageComponent: PageComponent,
    changeDetectorRef: ChangeDetectorRef
  ) {

    this.sheetService = pageComponent.sheetService;
    this.editorService = pageComponent.editorService;

    const left = this.left$.pipe(startWith(-1), pairwise(), filter(([a, b]) => a !== b), map(([a, b]) => b));
    left.subscribe(v => { this.left = v; changeDetectorRef.markForCheck(); });
    const top = this.top$.pipe(startWith(-1), pairwise(), filter(([a, b]) => a !== b), map(([a, b]) => b));
    top.subscribe(v => { this.top = v; changeDetectorRef.markForCheck(); });
    const width = this.width$.pipe(startWith(-1), pairwise(), filter(([a, b]) => a !== b), map(([a, b]) => b));
    width.subscribe(v => { this.width = v; changeDetectorRef.markForCheck(); });
    const height = this.height$.pipe(startWith(-1), pairwise(), filter(([a, b]) => a !== b), map(([a, b]) => b));
    height.subscribe(v => { this.height = v; changeDetectorRef.markForCheck(); });
  }

  ngOnInit(): void {
    const pageRef: HTMLDivElement = this.pageComponent.ref.nativeElement;
    let start = { lcol: 0, trow: 0, rcol: 0, brow: 0 };
    //  - Начать выделение
    fromEvent(pageRef, 'mousedown').subscribe((event: MouseEvent) => {

      start = this.getCellsFromPoint(event.clientX, event.clientY);
      const endMove = new Subject();

      if (this.editorService.topologe[start.lcol] && this.editorService.topologe[start.lcol][start.trow]) {
        const topologe = this.editorService.topologe[start.lcol][start.trow];
        start = { ...start, rcol: topologe.rc, brow: topologe.br };
      }

      // - Записать в матрицу выделения
      this.selectionMatrix.cols = [start.lcol, start.rcol];
      this.selectionMatrix.rows = [start.trow, start.brow];
      // - Отрисовать выделние
      this.calculatePositionCur();

      // - если мышь отпущена - прекратить выделение
      fromEvent(document, 'mouseup').pipe(takeUntil(endMove)).subscribe(() => { endMove.next(); endMove.complete(); });
      // - Начать отслеживание перемещения мыши
      fromEvent(document, 'mousemove').pipe(takeUntil(endMove))
        .subscribe((ev: MouseEvent) => {
          let moved = this.getCellsFromPoint(ev.clientX, ev.clientY);
          if (this.editorService.topologe[moved.lcol] && this.editorService.topologe[moved.lcol][moved.trow]) {
            const topologe = this.editorService.topologe[moved.lcol][moved.trow];
            moved = { ...start, rcol: topologe.rc, brow: topologe.br };
          }

          // - Добавить в матрицу выделения ячейки
          this.selectionMatrix.cols = [start.lcol, start.rcol, moved.lcol, moved.rcol];
          this.selectionMatrix.rows = [start.trow, start.brow, moved.trow, moved.brow];
          // - Отрисовать выделние
          this.calculatePositionCur();

          if (ev.buttons !== 1) { endMove.next(); endMove.complete(); }
        });
    });

  }

  @HostListener('dblclick')
  dblClick() {
    this.calculatePositionCur();
    this.editorService.activeTopologe$.next(Array.from(this.getTopologe())[0] || this.createTopologe());
  }

  @HostListener('document:keydown', ['$event'])
  f2Down(evt: KeyboardEvent) {
    switch (evt.key) {
      case 'F2':
        this.calculatePositionCur();
        this.editorService.activeTopologe$.next(Array.from(this.getTopologe())[0] || this.createTopologe());
        break;
    }
  }

  calculatePositionCur() {
    //      - Получить углы матрицы
    this.lc = Math.min.apply(Math, this.selectionMatrix.cols);
    this.rc = Math.max.apply(Math, this.selectionMatrix.cols);
    this.tr = Math.min.apply(Math, this.selectionMatrix.rows);
    this.br = Math.max.apply(Math, this.selectionMatrix.rows);

    // - Отрисовать выделение
    this.unsubscriber.next();

    this.sheetService.cols[this.lc].left.pipe(takeUntil(this.unsubscriber)).subscribe(v => { this.left$.next(v); });

    this.sheetService.rows[this.tr].top.pipe(takeUntil(this.unsubscriber)).subscribe(v => { this.top$.next(v); });

    combineLatest([this.sheetService.cols[this.rc].rigth, this.sheetService.cols[this.lc].left])
      .pipe(takeUntil(this.unsubscriber), map(([a, b]: [number, number]) => a - b + 2)).subscribe(a => { this.width$.next(a); });

    combineLatest([this.sheetService.rows[this.br].bottom, this.sheetService.rows[this.tr].top])
      .pipe(takeUntil(this.unsubscriber), map(([a, b]: [number, number]) => a - b + 2)).subscribe((a) => { this.height$.next(a); });
  }

  getCellsFromPoint(x: number, y: number) {
    ///this.editorService.activeTopologe$.next(false);
    let col = null;
    let row = null;
    for (const element of document.elementsFromPoint(x, y)) {
      if (element.tagName.toLocaleLowerCase() === 'sheet-topologe') {
        col = element.getAttribute('data-col');
        row = element.getAttribute('data-row');
        break;
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
    return { lcol: col, trow: row, rcol: col, brow: row };
  }

  getTopologe() {
    return new Set(
      this.editorService.topologe.slice(this.lc, this.rc + 1)
        .filter(a => Array.isArray(a))
        .map(a => a.slice(this.tr, this.br + 1))
        .reduce((c, a) => c.concat(a), [])
    );
  }

  createTopologe(type = Control[Control.TextComponent]) {
    this.editorService.topologe[this.lc] = this.editorService.topologe[this.lc] || [];
    this.editorService.topologe[this.lc][this.tr] = new TopologeDto(this.lc, this.tr, this.rc, this.br);
    this.editorService.topologe[this.lc][this.tr].type = type;
    (this.editorService as EditorService).topologe$.next(
      this.editorService.topologe
        .reduce((c, a) => c.concat(a), [])
        .filter(a => a instanceof TopologeDto)
    );
    return this.editorService.topologe[this.lc][this.tr];
  }
}
