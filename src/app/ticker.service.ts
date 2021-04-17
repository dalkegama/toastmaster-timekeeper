import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

export interface Ticker {
  minutes: number;
  seconds: number;
}

export interface TimeKeeper {
  g: number;
  y: {
    m: number;
    s: number;
  };
  r: number;
}
@Injectable()
export class TickerService {
  private ticker: BehaviorSubject<Ticker> = new BehaviorSubject({
    minutes: 0,
    seconds: 0,
  });
  readonly ticker$ = this.ticker.asObservable();

  private timeKeeper: Subject<TimeKeeper> = new Subject();
  readonly timeKeeper$ = this.timeKeeper.asObservable();

  constructor() {}

  updateTicker(timeElapsed: Ticker) {
    this.ticker.next(timeElapsed);
  }

  resetTicker() {
    this.ticker.next({
      minutes: 0,
      seconds: 0,
    });
  }

  timeKeeperCard(
    green: number,
    yellow: number,
    red: number,
    isHalf?: boolean
  ): void {
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
