import { createReducer, on } from '@ngrx/store';
import { Farm } from '../entities/farm';
import { FarmForm } from './components/farm-form/farm-form.component';
import * as FarmStoreActions from './farm.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface FarmState extends EntityState<Farm> {
    loading: boolean;
    loaded: boolean;
    error: string;
    buttonStates: boolean[];
    selectedFarmId: string;
    form: FarmForm;
    edit: boolean;
}

export const adapter: EntityAdapter<Farm> = createEntityAdapter<Farm>({
    selectId: (f: Farm) => f.id,
});

export const NEW_ID = 'new-id';
export const BUTTON_STATES = {
    unselected: [true, false, false, false, false],
    selected: [true, true, false, false, true],
    edit: [false, false, true, true, false],
};

export const initialState: FarmState = adapter.getInitialState({
    loading: false,
    loaded: false,
    error: null,
    buttonStates: BUTTON_STATES.unselected,
    selectedFarmId: '',
    form: { name: '', area: null, number: '' },
    edit: false,
});

export const farmReducer = createReducer(
    initialState,
    on(FarmStoreActions.getFarms, state => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(FarmStoreActions.getFarmsDone, (state, { farms }) =>
        adapter.addAll(farms, { ...state, loading: false, loaded: true, error: null }),
    ),
    on(FarmStoreActions.getFarmsFail, (state, action) => ({
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
    })),
    on(FarmStoreActions.selectFarm, (state, { id }) => ({
        ...state,
        selectedFarmId: id,
        form: toFarmFormValue(state.entities[id]),
        buttonStates: id ? BUTTON_STATES.selected : BUTTON_STATES.unselected,
        edit: false,
    })),
    on(FarmStoreActions.deleteFarm, state => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(FarmStoreActions.deleteFarmDone, (state, { deleted }) =>
        adapter.removeOne(deleted.id, {
            ...state,
            loading: false,
            loaded: true,
            error: null,
            selectedFarmId: '',
            buttonStates: BUTTON_STATES.unselected,
        }),
    ),
    on(FarmStoreActions.deleteFarmFail, (state, action) => ({
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
    })),
    on(FarmStoreActions.editFarm, (state, action) => ({
        ...state,
        edit: action.edit,
        buttonStates: action.edit ? BUTTON_STATES.edit : BUTTON_STATES.selected,
    })),
    on(FarmStoreActions.farmFormChanged, (state, action) => ({ ...state, form: action.value })),
    on(FarmStoreActions.cancelEditFarm, state => {
        if (state.selectedFarmId === NEW_ID) {
            return {
                ...state,
                buttonStates: BUTTON_STATES.unselected,
                form: null,
                selectedFarmId: '',
                edit: false,
            };
        } else {
            return {
                ...state,
                buttonStates: BUTTON_STATES.selected,
                form: toFarmFormValue(state.entities[state.selectedFarmId]),
                edit: false,
            };
        }
    }),
    on(FarmStoreActions.saveEditFarm, state => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(FarmStoreActions.saveEditFarmDone, (state, { saved }) =>
        adapter.upsertOne(saved, {
            ...state,
            loading: false,
            loaded: true,
            error: null,
            buttonStates: BUTTON_STATES.selected,
            edit: false,
        }),
    ),
    on(FarmStoreActions.addNewFarmDone, (state, action) =>
        adapter.addOne(action.created, {
            ...state,
            loading: false,
            loaded: true,
            error: null,
            buttonStates: BUTTON_STATES.selected,
            edit: false,
            selectedFarmId: action.created.id,
        }),
    ),
    on(FarmStoreActions.saveEditFarmFail, (state, action) => ({
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
    })),
    on(FarmStoreActions.addFarm, state => ({
        ...state,
        buttonStates: BUTTON_STATES.edit,
        selectedFarmId: NEW_ID,
        form: { name: '', number: '', area: null },
        edit: true,
    })),
);
const { selectAll } = adapter.getSelectors();
export const selectAllFarms = selectAll;

function toFarmFormValue(farm: Farm): FarmForm {
    return {
        name: farm.name,
        area: farm.area,
        number: farm.number,
    };
}
