import { Injectable } from '@angular/core';
import { StoreService, Store } from './stores';
import { Game } from 'src/app/shared/models/game.model';

@Injectable({ providedIn: 'root' })
export class GamesStore extends StoreService<Game> {

    public createNew(word: string): void {
        this.next(new Game(word.toUpperCase()));
    }

}
