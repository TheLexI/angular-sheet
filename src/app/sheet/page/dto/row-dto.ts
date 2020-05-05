import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export class RowDto {
  next: RowDto;
  top: Observable<number>;
  height = new BehaviorSubject<number>(0);
  bottom: Observable<number>;

  constructor(public rowId: number, height: number, public prev: RowDto = null) {
    if (this.prev) {
      this.prev.next = this;
      this.top = this.prev.bottom;
    } else {
      this.top = of(0).pipe(shareReplay(1));
    }
    this.bottom = combineLatest([this.top, this.height]).pipe(map(([a, b]) => a + b), shareReplay(1));
    this.height.next(height);
  }
}
