import { Component, OnInit, ChangeDetectionStrategy, ElementRef, HostListener } from '@angular/core';
import { SheetService } from '../sheet.service';
import { EditorService } from '../editor.service';

@Component({
  selector: 'sheet-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {

  constructor(
    public ref: ElementRef,
    public sheetService: SheetService,
    public editorService: EditorService
  ) {
    this.editorService.inject(this);
    this.sheetService.inject(this);
  }

  ngOnInit(): void {
  }

}
