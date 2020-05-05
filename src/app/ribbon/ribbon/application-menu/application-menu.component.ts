import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ribbon-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements OnInit {
  @Input() label = '';
  constructor() { }

  ngOnInit(): void {
  }

}
