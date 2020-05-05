import { Component, OnInit, Input } from '@angular/core';
import { RibbonService } from '../../ribbon.service';

@Component({
  selector: 'ribbon-btn-group',
  templateUrl: './btn-group.component.html',
  styleUrls: ['./btn-group.component.scss']
})
export class BtnGroupComponent implements OnInit {
  @Input() public command = null;

  constructor(
    private ribbonService: RibbonService
  ) { }

  ngOnInit(): void {
  }

  public sendPayload(payload: any) {
    this.ribbonService.states$.next({ [this.command]: payload });
  }

}
