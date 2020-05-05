import { Component, OnInit, Input } from '@angular/core';
import { RibbonService } from '../../ribbon.service';
import { map, startWith, pairwise, filter } from 'rxjs/operators';

@Component({
  selector: 'ribbon-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  exportAs: 'button'
})
export class ButtonToggleComponent implements OnInit {
  @Input() command = -1;
  @Input() payload = {};

  state = false;

  constructor(
    private ribbonService: RibbonService
  ) {
    this.ribbonService.states$.pipe(
      filter((a: { [name: string]: any }) => String(this.command) in a),
      startWith({}),
      map(a => a[String(this.command)] || false),
      pairwise(),
      filter(([a, b]) => a !== b),
      map(([a, b]) => b)
    ).subscribe(b => {
      this.state = b;
    });
  }

  ngOnInit(): void {
  }

  click(evt: MouseEvent) {
    evt.stopPropagation();
    this.ribbonService.states$.next({ [String(this.command)]: !this.state });
  }

}
