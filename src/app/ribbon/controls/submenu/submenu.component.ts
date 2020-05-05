import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ribbon-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  exportAs: 'ribbonSubmenu',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
