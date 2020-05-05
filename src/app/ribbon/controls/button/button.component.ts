import { Component, OnInit, Input } from '@angular/core';
import { RibbonService } from '../../ribbon.service';

@Component({
  selector: 'ribbon-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() command = undefined;
  @Input() payload = {};


  constructor(
    private ribbonService: RibbonService
  ) {
  }

  ngOnInit(): void {
  }

  click() {
    this.ribbonService.onCommand.next({ command: this.command, payload: this.payload });
  }
}
