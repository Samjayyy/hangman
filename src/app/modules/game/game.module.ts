import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { GameRoutingModule } from './game-routing.module';
import { RootComponent } from './components/root/root.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { PlayGameComponent } from './components/play-game/play-game.component';
import { StoreFeedbackComponent } from './components/storefeedback/storefeedback.component';
import { HttpClientModule } from '@angular/common/http';
import { KeyboardComponent } from './components/keyboard/keyboard.component';

@NgModule({
  declarations: [
    RootComponent,
    StartGameComponent,
    PlayGameComponent,
    StoreFeedbackComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    GameRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class GameModule { }
