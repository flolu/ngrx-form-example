import { createReducer, on } from '@ngrx/store';
import { Farm } from '../entities/farm';
import { FarmForm } from './components/farm-form/farm-form.component';
import {
    addFarm,
    addNewFarmDone,
    cancelEditFarm,
    deleteFarm,
    deleteFarmDone,
    deleteFarmFail,
    editFarm,
    farmFormChanged,
    getFarms,
    getFarmsDone,
    getFarmsFail,
    saveEditFarm,
    saveEditFarmDone,
    saveEditFarmFail,
    selectFarm,
} from './farm.actions';

export interface FarmState {
    loading: boolean;
    loaded: boolean;
    error: string;
    farms: Farm[];
    buttonStates: boolean[];
    selectedFarmId: string;
    form: FarmForm;
    edit: boolean;
}

export const NEW_ID = 'new-id';
export const BUTTON_STATES = {
    unselected: [true, false, false, false, false],
    selected: [true, true, false, false, true],
    edit: [false, false, true, true, false],
};

export const initialState: FarmState = {
    loading: false,
    loaded: false,
    error: null,
    farms: [],
    buttonStates: BUTTON_STATES.unselected,
    selectedFarmId: '',
    form: { name: '', area: null, number: '' },
    edit: false,
};

export const farmReducer = createReducer(
    initialState,
    on(getFarms, state => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getFarmsDone, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        farms: action.farms,
    })),
    on(getFarmsFail, (state, action) => ({
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        farms: [],
    })),
    on(selectFarm, (state, action) => ({
        ...state,
        selectedFarmId: action.id,
        form: toFarmFormValue(getSelectedFarmById(state.farms, action.id)),
        buttonStates: action.id ? BUTTON_STATES.selected : BUTTON_STATES.unselected,
        edit: false,
    })),
    on(deleteFarm, state => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(deleteFarmDone, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        farms: state.farms.filter(f => f.id !== action.deleted.id),
        selectedFarmId: '',
        buttonStates: BUTTON_STATES.unselected,
    })),
    on(deleteFarmFail, (state, action) => ({
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
    })),
    on(editFarm, (state, action) => ({
        ...state,
        edit: action.edit,
        buttonStates: action.edit ? BUTTON_STATES.edit : BUTTON_STATES.selected,
    })),
    on(farmFormChanged, (state, action) => ({ ...state, form: action.value })),
    on(cancelEditFarm, state => {
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
                form: toFarmFormValue(getSelectedFarmById(state.farms, state.selectedFarmId)),
                edit: false,
            };
        }
    }),
    on(saveEditFarm, (state, action) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(saveEditFarmDone, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        farms: state.farms.map(f => (f.id === action.saved.id ? action.saved : f)),
        buttonStates: BUTTON_STATES.selected,
        edit: false,
    })),
    on(addNewFarmDone, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        farms: [...state.farms, action.created],
        buttonStates: BUTTON_STATES.selected,
        edit: false,
        selectedFarmId: action.created.id,
    })),
    on(saveEditFarmFail, (state, action) => ({
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
    })),
    on(addFarm, state => ({
        ...state,
        buttonStates: BUTTON_STATES.edit,
        selectedFarmId: NEW_ID,
        form: { name: '', number: '', area: null },
        edit: true,
    })),
);

function getSelectedFarmById(farms: Farm[], id: string): Farm {
    return farms.filter(f => f.id === id)[0];
}

function toFarmFormValue(farm: Farm): FarmForm {
    return {
        name: farm.name,
        area: farm.area,
        number: farm.number,
    };
}
