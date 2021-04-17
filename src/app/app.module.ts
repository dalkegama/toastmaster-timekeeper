import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ScreenComponent } from "./screen/screen.component";
import { TimerComponent } from "./timer/timer.component";
import { TickerService } from "./ticker.service";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule],
  declarations: [AppComponent, ScreenComponent, TimerComponent],
  bootstrap: [AppComponent],
  providers: [TickerService],
})
export class AppModule {}
