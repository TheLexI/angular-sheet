import { Component, OnInit, Input, HostBinding, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, Type } from '@angular/core';
import { TopologeDto } from '../dto/topologe-dto';
import { SheetService } from '../../sheet.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { EditorService } from '../../editor.service';
import { ContentRefDirective } from '../../controls/content-ref.directive';
import { Controls, Control } from '../../controls/controls';

@Component({
  selector: 'sheet-topologe',
  templateUrl: './topologe.component.html',
  styleUrls: ['./topologe.component.scss']
})
export class TopologeComponent implements OnInit {
  @Input() topologe: TopologeDto;
  @ViewChild('ref', { static: true, read: ViewContainerRef }) contentRef: ViewContainerRef;

  @HostBinding('style.left.px') left;
  @HostBinding('style.top.px') top;
  @HostBinding('style.width.px') width;
  @HostBinding('style.height.px') height;

  @HostBinding('style.zIndex') zIndex = 10;

  private unsubscriber = new Subject();

  private element = null;

  constructor(
    private sheetService: SheetService,
    private editorService: EditorService,
    private changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.setPosition();
    this.topologe.change$.subscribe(() => this.setPosition());

    this.editorService.activeTopologe$.subscribe(a => {
      this.zIndex = (a === this.topologe) ? 10 : 0;
    });

    if (!this.element) {
      this.element = this.contentRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(Controls.getComponent(this.topologe.type))
      );
    }

  }

  setPosition() {
    this.unsubscriber.next();
    this.sheetService.cols[this.topologe.lc].left.pipe(takeUntil(this.unsubscriber))
      .subscribe(a => { this.left = a; this.changeDetectorRef.markForCheck(); });

    this.sheetService.rows[this.topologe.tr].top.pipe(takeUntil(this.unsubscriber))
      .subscribe(a => { this.top = a; this.changeDetectorRef.markForCheck(); });

    combineLatest([this.sheetService.cols[this.topologe.rc].rigth, this.sheetService.cols[this.topologe.lc].left])
      .pipe(takeUntil(this.unsubscriber), map(([a, b]) => a - b)).subscribe(a => {
        this.width = a;
        this.changeDetectorRef.markForCheck();
      });

    combineLatest([this.sheetService.rows[this.topologe.br].bottom, this.sheetService.rows[this.topologe.tr].top])
      .pipe(takeUntil(this.unsubscriber), map(([a, b]) => a - b)).subscribe((a) => {
        this.height = a;
        this.changeDetectorRef.markForCheck();
      });
  }
}
