import { Component } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { TickerService } from "../ticker.service";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.scss"],
})
export class TimerComponent {
  private timerSubscription: Subscription;
  isCounterRunning: boolean = false;
  constructor(private ts: TickerService) {}

  /**
   * At 5 minutes, I will raise the green card.
   * At 6 minutes, I will raise the yellow card.
   * At 7 minutes, I will raise the red card.
   */
  startSpeechesTimer() {
    this.startCounter();
    this.ts.timeKeeperCard(5, 6, 7);
  }

  /**
   * At 2 minutes, I will raise the green card.
   * At 2 minutes and 30 seconds, I will raise the yellow card.
   * At 3 minutes, I will raise the red card.
   */
  startEvaluationTimer() {
    this.startCounter();
    this.ts.timeKeeperCard(2, 2, 3, true);
  }

  /**
   * At 2 minutes, I will raise the green card.
   * At 2 minutes and 30 seconds, I will raise the yellow card.
   * At 3 minutes, I will raise the red card.
   */
  startTableTopicsTimer() {
    this.startCounter();
    this.ts.timeKeeperCard(1, 1, 2, true);
  }

  /**
   * At 4 minutes, I will raise the green card.
   * At 5 minutes, I will raise the yellow card.
   * At 6 minutes, I will raise the red card.
   */
  startIceBreakerTimer() {
    this.startCounter();
    this.ts.timeKeeperCard(4, 5, 6);
  }

  startCounter() {
    this.isCounterRunning = true;
    this.timerSubscription = timer(0, 100).subscribe((elapsedCycles) => {
      const minutes = Math.floor((elapsedCycles % 3600) / 60);
      const seconds = Math.floor((elapsedCycles % 3600) % 60);
      this.ts.updateTicker({ minutes, seconds });
    });
  }

  stopTheTimer() {
    this.timerSubscription.unsubscribe();
    this.isCounterRunning = false;
  }

  resetTimer() {
    this.ts.resetTicker();
    this.isCounterRunning = false;
  }
}
