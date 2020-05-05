import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ribbon-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() label = '';
  constructor() { }

  ngOnInit(): void {
  }

}
