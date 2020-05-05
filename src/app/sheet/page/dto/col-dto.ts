import { combineLatest, Observable, of, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export class ColDto {
  next: ColDto = null;

  left: Observable<number>;
  width = new BehaviorSubject<number>(0);
  rigth: Observable<number>;

  constructor(public colId: number, width: number, public prev: ColDto = null) {
    if (this.prev) {
      this.prev.next = this;
      this.left = this.prev.rigth;
    } else {
      this.left = of(0).pipe(shareReplay(1));
    }
    this.rigth = combineLatest([this.left, this.width]).pipe(map(([a, b]) => a + b), shareReplay(1));
    this.width.next(width);
  }
}
