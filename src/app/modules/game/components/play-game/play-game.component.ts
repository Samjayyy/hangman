import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GamesStore } from 'src/app/core/services/store/games.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'hm-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public game: Game = null;
  public error?: string = null;
  public isFetching = true;

  constructor(
    private gameStore: GamesStore,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameStore.store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(store => {
        if (store.data) {
          this.game = store.data;
        } else if (!store.isFetching && !store.error) {
          this.router.navigate(['/']);
        }
        this.isFetching = store.isFetching;
        this.error = store.error;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
