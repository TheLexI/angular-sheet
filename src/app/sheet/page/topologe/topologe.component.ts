import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TopologeDto } from '../dto/topologe-dto';
import { SheetService } from '../../sheet.service';

@Component({
  selector: 'sheet-topologe',
  templateUrl: './topologe.component.html',
  styleUrls: ['./topologe.component.scss']
})
export class TopologeComponent implements OnInit {
  @Input() topologe: TopologeDto;

  @HostBinding('style.left.px') left;
  @HostBinding('style.top.px') top;
  @HostBinding('style.width.px') width;
  @HostBinding('style.height.px') height;


  constructor(
    private sheetService: SheetService
  ) { }

  ngOnInit(): void {
    this.topologe.onChane$.subscribe(() => this.setPosition());
  }

  setPosition() {

  }

}
