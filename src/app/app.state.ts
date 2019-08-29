import { createFeatureSelector } from '@ngrx/store';
import { FarmState } from './farm/farm.reducer';

export interface AppState {
    farm: FarmState;
}

export const selectFarmState = createFeatureSelector('farm');
