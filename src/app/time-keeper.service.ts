import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TimeKeeper } from "./ticker.service";

@Injectable({
  providedIn: "root",
})
export class TimeKeeperService {
  private timeKeeper: Subject<TimeKeeper> = new Subject();
  readonly timeKeeper$ = this.timeKeeper.asObservable();

  constructor() {}

  logCards(green: number, yellow: number, red: number, isHalf?: boolean): void {
    this.timeKeeper.next({
      g: green,
      y: {
        m: yellow,
        s: isHalf ? 30 : 0,
      },
      r: red,
    });
  }
}
