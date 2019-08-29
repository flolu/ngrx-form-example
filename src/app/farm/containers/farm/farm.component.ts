import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Farm } from 'src/app/entities/farm';
import { FarmForm } from '../../components/farm-form/farm-form.component';
import {
    cancelEditFarm,
    deleteFarm,
    editFarm,
    farmFormChanged,
    getFarms,
    selectFarm,
    saveEditFarm,
    addFarm,
} from '../../farm.actions';
import { FarmState } from '../../farm.reducer';
import {
    selectSelectedFarmId,
    selectForm,
    selectEdit,
    selectError,
    selectLoading,
    selectFarms,
    selectButtonStates,
} from '../../farm.selectors';

@Component({
    selector: 'app-farm',
    templateUrl: './farm.component.html',
    styleUrls: ['./farm.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmComponent {
    formState$: Observable<FarmForm> = this.store.select(selectForm);
    edit$: Observable<boolean> = this.store.select(selectEdit);
    error$: Observable<string> = this.store.select(selectError);
    loading$: Observable<boolean> = this.store.select(selectLoading);
    farms$: Observable<Farm[]> = this.store.select(selectFarms);
    selectedFarmId$: Observable<string> = this.store.select(selectSelectedFarmId);
    buttonStates$: Observable<boolean[]> = this.store.select(selectButtonStates);

    constructor(private store: Store<{ farm: FarmState }>) {
        this.store.dispatch(getFarms());
    }

    onSelectFarm = (farmId: string) => this.store.dispatch(selectFarm({ id: farmId }));
    onAdd = () => this.store.dispatch(addFarm());
    onEdit = () => this.store.dispatch(editFarm({ edit: true }));
    onSave = () => this.store.dispatch(saveEditFarm());
    onCancel = () => this.store.dispatch(cancelEditFarm());
    onDelete = () => this.store.dispatch(deleteFarm());
    onUpdateForm = (value: FarmForm) => this.store.dispatch(farmFormChanged({ value }));
}
