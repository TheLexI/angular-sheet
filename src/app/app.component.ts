import { Component } from '@angular/core';
import { Commands } from './commands.enum';
import { RibbonService } from './ribbon/ribbon.service';
import { filter } from 'rxjs/operators';
import { EditorService } from './sheet/editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Commands = Commands;
  fonts = [
    { ff: 'Arial, Helvetica, sans-serif', name: 'Arial' },
    { ff: '"Arial Black", Gadget, sans-serif', name: 'Arial Black' },
    { ff: '"Comic Sans MS", cursive', name: 'Comic Sans MS' },
    { ff: '"Courier New", Courier, monospace', name: '	Courier New' },
    { ff: 'Georgia, serif', name: 'Georgia' },
    { ff: 'Impact,Charcoal, sans-serif', name: 'Impact' },
    { ff: '"Lucida Console", Monaco, monospace', name: 'Lucida Console' },
    { ff: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', name: 'Lucida Sans Unicode' },
    { ff: '"Palatino Linotype", "Book Antiqua", Palatino, serif', name: 'Palatino Linotype' },
    { ff: 'Tahoma, Geneva, sans-serif', name: 'Tahoma' },
    { ff: '"Times New Roman", Times, serif', name: 'Times New Roman' },
    { ff: '"Trebuchet MS", Helvetica, sans-serif', name: 'Trebuchet MS' },
    { ff: 'Verdana, Geneva, sans-serif', name: 'Verdana' },
    { ff: 'Symbol', name: 'Symbol' },
    { ff: 'Webdings', name: 'Webdings' },
    { ff: 'Wingdings, "Zapf Dingbats"', name: 'Wingdings' },
    { ff: '"MS Sans Serif", Geneva, sans-serif', name: 'MS Sans Serif' },
    { ff: '"MS Serif", "New York", serif', name: 'MS Serif' },
  ];
  fontSizes = [6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];



  title = 'ribbon';

  constructor(
    private ribbonService: RibbonService,
    private editorService: EditorService
  ) {

    ribbonService.states$.pipe(filter((a: { [name: string]: any }) => !a.noEvent && Commands.EditBorderAll in a))
      .subscribe(a => {
        ribbonService.states$.next({
          noEvent: true,
          [String(Commands.EditBorderOutside)]: a[Commands.EditBorderAll],
          [String(Commands.EditBorderInside)]: a[Commands.EditBorderAll],
          [String(Commands.EditBorderHorizontal)]: a[Commands.EditBorderAll],
          [String(Commands.EditBorderVertical)]: a[Commands.EditBorderAll],
          [String(Commands.EditBorderLeft)]: a[Commands.EditBorderAll],
          [String(Commands.EditBorderTop)]: a[Commands.EditBorderAll],
          [String(Commands.EditBorderRight)]: a[Commands.EditBorderAll],
          [String(Commands.EditBorderBottom)]: a[Commands.EditBorderAll],
          [String(Commands.EditBorderNone)]: !a[Commands.EditBorderAll],
        });
      });

    ribbonService.states$.pipe(filter((a: { [name: string]: any }) => !a.noEvent && Commands.EditBorderOutside in a))
      .subscribe(a => {
        ribbonService.states$.next({
          noEvent: true,
          [String(Commands.EditBorderLeft)]: a[Commands.EditBorderOutside],
          [String(Commands.EditBorderTop)]: a[Commands.EditBorderOutside],
          [String(Commands.EditBorderRight)]: a[Commands.EditBorderOutside],
          [String(Commands.EditBorderBottom)]: a[Commands.EditBorderOutside],
        });
        ribbonService.states$.next({
          noEvent: true,
          [String(Commands.EditBorderAll)]: this.isActiveAll(),
          [String(Commands.EditBorderNone)]: this.isInactive()
        });
      });

    ribbonService.states$.pipe(filter((a: { [name: string]: any }) => !a.noEvent && Commands.EditBorderInside in a))
      .subscribe(a => {
        ribbonService.states$.next({
          noEvent: true,
          [String(Commands.EditBorderHorizontal)]: a[Commands.EditBorderInside],
          [String(Commands.EditBorderVertical)]: a[Commands.EditBorderInside],
        });

        ribbonService.states$.next({
          noEvent: true,
          [String(Commands.EditBorderAll)]: this.isActiveAll(),
          [String(Commands.EditBorderNone)]: this.isInactive()
        });
      });

    ribbonService.states$.pipe(
      filter((a: { [name: string]: any }) =>
        !a.noEvent && (
          Commands.EditBorderHorizontal in a ||
          Commands.EditBorderVertical in a))
    ).subscribe(a => {
      this.ribbonService.states$.next({
        noEvent: true,
        [Commands.EditBorderInside]: Object.values({
          [Commands.EditBorderHorizontal]: this.ribbonService.states[Commands.EditBorderHorizontal],
          [Commands.EditBorderVertical]: this.ribbonService.states[Commands.EditBorderVertical],
          ...a
        }).every(a => a === true)
      });

      ribbonService.states$.next({
        noEvent: true,
        [String(Commands.EditBorderAll)]: this.isActiveAll(),
        [String(Commands.EditBorderNone)]: this.isInactive()
      });

    });

    ribbonService.states$.pipe(
      filter((a: { [name: string]: any }) =>
        !a.noEvent && (
          Commands.EditBorderLeft in a ||
          Commands.EditBorderTop in a ||
          Commands.EditBorderRight in a ||
          Commands.EditBorderBottom in a))
    ).subscribe(a => {
      this.ribbonService.states$.next({
        noEvent: true,
        [Commands.EditBorderOutside]: Object.values({
          [Commands.EditBorderLeft]: this.ribbonService.states[Commands.EditBorderLeft],
          [Commands.EditBorderTop]: this.ribbonService.states[Commands.EditBorderTop],
          [Commands.EditBorderRight]: this.ribbonService.states[Commands.EditBorderRight],
          [Commands.EditBorderBottom]: this.ribbonService.states[Commands.EditBorderBottom],
          ...a
        }).every(a => a === true)
      });

      ribbonService.states$.next({
        noEvent: true,
        [String(Commands.EditBorderAll)]: this.isActiveAll(),
        [String(Commands.EditBorderNone)]: this.isInactive()
      });

    });

    ribbonService.states$.pipe(filter((a: { [name: string]: any }) => !a.noEvent && Commands.EditBorderNone in a))
      .subscribe(a => {
        ribbonService.states$.next({
          noEvent: true,
          [String(Commands.EditBorderOutside)]: !a[Commands.EditBorderNone],
          [String(Commands.EditBorderInside)]: !a[Commands.EditBorderNone],
          [String(Commands.EditBorderHorizontal)]: !a[Commands.EditBorderNone],
          [String(Commands.EditBorderVertical)]: !a[Commands.EditBorderNone],
          [String(Commands.EditBorderLeft)]: !a[Commands.EditBorderNone],
          [String(Commands.EditBorderTop)]: !a[Commands.EditBorderNone],
          [String(Commands.EditBorderRight)]: !a[Commands.EditBorderNone],
          [String(Commands.EditBorderBottom)]: !a[Commands.EditBorderNone],
          [String(Commands.EditBorderAll)]: !a[Commands.EditBorderNone],
        });
      });
    ribbonService.states$.next({ [Commands.EditBorderNone]: true });

  }

  isInactive() {
    return ![
      Commands.EditBorderOutside,
      Commands.EditBorderInside,
      Commands.EditBorderHorizontal,
      Commands.EditBorderVertical,
      Commands.EditBorderLeft,
      Commands.EditBorderTop,
      Commands.EditBorderRight,
      Commands.EditBorderBottom]
      .map(a => this.ribbonService.states[a])
      .some(a => a === true);
  }

  isActiveAll() {
    return ![
      Commands.EditBorderHorizontal,
      Commands.EditBorderVertical,
      Commands.EditBorderLeft,
      Commands.EditBorderTop,
      Commands.EditBorderRight,
      Commands.EditBorderBottom]
      .map(a => this.ribbonService.states[a] || false)
      .some(a => a === false);
  }

  doCommand(event) {
    this.editorService.command$.next(event);
    console.log(event);
  }
}
