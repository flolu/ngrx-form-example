import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { Farm } from '../entities/farm';
import { farms } from './fake-database';
import { take, map, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FarmService {
    constructor() {}

    public getAll(): Observable<Farm[]> {
        const fetchDelay: number = Math.floor(Math.random() * 1000) + 1;
        const willSucceed: boolean = Math.random() < 0.9;
        return of(farms).pipe(
            delay(fetchDelay),
            map(farms => {
                if (willSucceed) {
                    return farms;
                } else {
                    throw new Error('mock error message while fetching all farms');
                }
            }),
        );
    }

    public deleteOne(id: string): Observable<Farm> {
        const fetchDelay: number = Math.floor(Math.random() * 1000) + 1;
        const willSucceed: boolean = Math.random() < 0.9;
        return of(farms.filter(f => f && f.id === id)[0] || { ...farms[0], id }).pipe(
            delay(fetchDelay),
            map(farm => {
                if (willSucceed) {
                    return farm;
                } else {
                    throw new Error('mock error message while deleting one farm');
                }
            }),
        );
    }
    public updateOne(farm: Farm): Observable<Farm> {
        const fetchDelay: number = Math.floor(Math.random() * 1000) + 1;
        const willSucceed: boolean = Math.random() < 0.9;
        return of(farm).pipe(
            delay(fetchDelay),
            map(farm => {
                if (willSucceed) {
                    return farm;
                } else {
                    throw new Error('mock error message while updating one farm');
                }
            }),
        );
    }
    public createOne(farm: Farm): Observable<Farm> {
        const fetchDelay: number = Math.floor(Math.random() * 1000) + 1;
        const willSucceed: boolean = Math.random() < 0.9;
        return of({ ...farm, id: this._uuidv4() }).pipe(
            delay(fetchDelay),
            map(farm => {
                if (willSucceed) {
                    return farm;
                } else {
                    throw new Error('mock error message while creating one farm');
                }
            }),
        );
    }

    private _uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
