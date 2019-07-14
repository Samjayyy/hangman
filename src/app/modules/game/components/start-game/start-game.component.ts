import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesStore } from 'src/app/core/services/store/games.store';
import { Router } from '@angular/router';
import { DictionaryStore } from 'src/app/core/services/store/dictionary.store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'hm-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  gameWord = '';
  typeSecret = true;
  startRandom = false;

  constructor(
    private dictionaryStore: DictionaryStore,
    private gameStore: GamesStore,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  takeRandom(): void {
    this.dictionaryStore
      .pickRandom()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(str => this.gameWord = str);
  }

  startGame(): void {
    this.gameStore.createNew(this.gameWord);
    this.router.navigate(['/play']);
  }

}
