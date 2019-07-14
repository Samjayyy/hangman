import { Injectable } from '@angular/core';
import { tap, map, first } from 'rxjs/operators';
import { StoreService, Store } from './stores';
import { CacheExpiry } from '../../util/cache-expiry';
import { DictionaryService } from '../asset/dictionary.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DictionaryStore extends StoreService<string[]> {
    private cacheExpiry = new CacheExpiry();

    constructor(private restService: DictionaryService) {
        super();
    }

    // get the cached data
    public fetchData(): void {
        if (!this.cacheExpiry.isExpired) {
            return;
        }
        this.setStateFetching();
        this.restService
            .getAll()
            .pipe(
                super.catchErrorAndReset(),
                tap((next: string[]) => {
                    this.store$.next({
                        ...this.store$.value,
                        data: next,
                        error: null,
                        isFetching: false
                    });
                }),
                tap(() => this.cacheExpiry.updated())
            ).subscribe();
    }

    public pickRandom(): Observable<string> {
        this.fetchData();
        return this.store$
            .pipe(
                first((data: Store<string[]>) => !data.error && !data.isFetching && data.data !== null)
                , map((data: Store<string[]>) => data.data)
                , map((data: string[]) => data[this.nextNumber(data.length)].toUpperCase())
            );
    }

    private nextNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }

    // Retrieve the data uncached
    public refresh(): void {
        this.cacheExpiry.refresh();
        this.fetchData();
    }
}
