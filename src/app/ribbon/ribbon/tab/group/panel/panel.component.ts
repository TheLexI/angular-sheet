import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ribbon-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements OnInit {
  // Размещение элементов- вертикальное или горизонтавльное
  @HostBinding('class') @Input() layout: 'vertical' | 'horisontal' = 'vertical';

  constructor() { }

  ngOnInit(): void {
  }

}
