import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Ticker, TickerService, TimeKeeper } from "../ticker.service";

@Component({
  selector: "app-screen",
  templateUrl: "./screen.component.html",
  styleUrls: ["./screen.component.scss"],
})
export class ScreenComponent implements OnInit, OnDestroy {
  constructor(private ts: TickerService) {}
  readonly timerDisplay = this.ts.ticker$;
  private timerKeeperSubscription: Subscription;
  private timeKeeper: TimeKeeper;
  timerTextColour: string = "text-gray-200";

  ngOnInit() {
    this.timerKeeperSubscription = this.ts.timeKeeper$.subscribe((cards) => {
      this.timeKeeper = cards;
    });
  }

  ngOnDestroy() {
    this.timerKeeperSubscription.unsubscribe();
  }

  changeBackgroundBasedOnTimeRemaining(ticker: Ticker) {
    switch (true) {
      case this.showGreenCard(ticker):
        return "bg-green-600";
      case this.showYellowCard(ticker):
        return "bg-yellow-400";
      case this.showRedCard(ticker):
        return "bg-red-600";
    }
  }

  private showGreenCard({ minutes, seconds }: Ticker) {
    if (this.timeKeeper?.y.s === 0) {
      if (minutes >= this.timeKeeper.g && minutes < this.timeKeeper.y.m) {
        this.timerTextColour = "text-green-700";
        return true;
      }
      return false;
    }
    if (
      minutes >= this.timeKeeper?.g &&
      minutes <= this.timeKeeper.y.m &&
      !(
        minutes >= this.timeKeeper?.y?.m &&
        minutes < this.timeKeeper.r &&
        seconds >= this.timeKeeper.y.s
      )
    ) {
      this.timerTextColour = "text-green-700";
      return true;
    }
    return false;
  }

  private showYellowCard({ minutes, seconds }: Ticker) {
    return minutes >= this.timeKeeper?.y?.m &&
      minutes < this.timeKeeper.r &&
      seconds >= this.timeKeeper.y.s
      ? ((this.timerTextColour = "text-yellow-500"), true)
      : false;
  }

  private showRedCard({ minutes }: Ticker) {
    return minutes >= this.timeKeeper?.r
      ? ((this.timerTextColour = "text-red-700"), true)
      : false;
  }
}
