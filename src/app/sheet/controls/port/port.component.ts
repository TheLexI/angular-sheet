import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { SheetService } from '../../sheet.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sheet-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent implements OnInit {

  right = combineLatest([
    this.sheetService.rows[this.sheetService.cursors[0].ref.tr].top,
    this.sheetService.lastRow.top
  ]).pipe(map(([a, b]) => a - b));
  constructor(
    public sheetService: SheetService
  ) { }

  ngOnInit(): void {

  }
}
