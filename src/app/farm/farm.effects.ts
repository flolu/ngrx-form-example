import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
    deleteFarm,
    deleteFarmDone,
    deleteFarmFail,
    getFarms,
    getFarmsDone,
    getFarmsFail,
    saveEditFarm,
    saveEditFarmDone,
    saveEditFarmFail,
    addNewFarmDone,
} from './farm.actions';
import { FarmService } from './farm.service';
import { NEW_ID } from './farm.reducer';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as FarmSelectors from './farm.selectors';

@Injectable()
export class FarmEffects {
    getFarms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getFarms),
            mergeMap(() =>
                this.farmService.getAll().pipe(
                    map(farms => getFarmsDone({ farms })),
                    catchError(error => of(getFarmsFail({ error }))),
                ),
            ),
        ),
    );

    deleteFarm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteFarm),
            withLatestFrom(this.store.select(FarmSelectors.selectSelectedFarmId)),
            switchMap(([_action, id]) =>
                this.farmService.deleteOne(id).pipe(
                    map(deleted => deleteFarmDone({ deleted })),
                    catchError(error => of(deleteFarmFail({ error }))),
                ),
            ),
        ),
    );

    saveEditFarm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveEditFarm),
            withLatestFrom(
                this.store.select(FarmSelectors.selectForm),
                this.store.select(FarmSelectors.selectSelectedFarmId),
            ),
            switchMap(([_action, form, id]) => {
                const farm = { ...form, id };
                if (farm.id === NEW_ID) {
                    return this.farmService.createOne(farm).pipe(
                        map(created => addNewFarmDone({ created })),
                        catchError(error => of(saveEditFarmFail({ error }))),
                    );
                } else {
                    return this.farmService.updateOne(farm).pipe(
                        map(saved => saveEditFarmDone({ saved })),
                        catchError(error => of(saveEditFarmFail({ error }))),
                    );
                }
            }),
        ),
    );

    constructor(private actions$: Actions, private farmService: FarmService, private store: Store<AppState>) {}
}
