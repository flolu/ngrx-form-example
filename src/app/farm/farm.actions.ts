import { createAction, props } from '@ngrx/store';
import { Farm } from '../entities/farm';
import { FarmForm } from './components/farm-form/farm-form.component';

export const getFarms = createAction('[Farm] Get');
export const getFarmsDone = createAction('[Farm] Get Done', props<{ farms: Farm[] }>());
export const getFarmsFail = createAction('[Farm] Get Fail', props<{ error: string }>());
export const selectFarm = createAction('[Farm] Select', props<{ id: string }>());
export const deleteFarm = createAction('[Farm] Delete');
export const deleteFarmDone = createAction('[Farm] Delete Done', props<{ deleted: Farm }>());
export const deleteFarmFail = createAction('[Farm] Delete Fail', props<{ error: string }>());
export const editFarm = createAction('[Farm] Edit', props<{ edit: boolean }>());
export const farmFormChanged = createAction('[Farm] Form Changed', props<{ value: FarmForm }>());
export const cancelEditFarm = createAction('[Farm] Cancel Edit');
export const saveEditFarm = createAction('[Farm] Save Edit');
export const saveEditFarmDone = createAction('[Farm] Save Edit Done', props<{ saved: Farm }>());
export const addNewFarmDone = createAction('[Farm] Add New Done', props<{ created: Farm }>());
export const saveEditFarmFail = createAction('[Farm] Save Edit Fail', props<{ error: string }>());
export const addFarm = createAction('[Farm] Add');
