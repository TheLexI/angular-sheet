import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ribbon-quick-access-tool-bar',
  templateUrl: './quick-access-tool-bar.component.html',
  styleUrls: ['./quick-access-tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickAccessToolBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
