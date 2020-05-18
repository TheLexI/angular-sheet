import { Component, OnInit } from '@angular/core';
import { SheetService } from '../../sheet.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sheet-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {
  right = combineLatest([
    this.sheetService.cols[this.sheetService.cursors[0].ref.lc].left,
    this.sheetService.lastCol.left
  ]).pipe(map(([a, b]) => a - b));
  constructor(
    public sheetService: SheetService
  ) { }

  ngOnInit(): void {

  }

}
