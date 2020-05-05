import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BtnGroupComponent } from '../btn-group.component';
import { RibbonService } from '../../../ribbon.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ribbon-btn-group-item',
  templateUrl: './btn-group-item.component.html',
  styleUrls: ['./btn-group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnGroupItemComponent implements OnInit {
  @Input() payload = {};
  isActive$ = this.ribbonService.states$.pipe(filter(a => this.groupRef.command in a), map(a => a[this.groupRef.command] === this.payload));
  constructor(
    private groupRef: BtnGroupComponent,
    private ribbonService: RibbonService
  ) { }

  ngOnInit(): void {
  }

  onclick() {
    this.groupRef.sendPayload(this.payload);
  }

}
