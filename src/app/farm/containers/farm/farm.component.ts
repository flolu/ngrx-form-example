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
import * as FarmStoreSelectors from '../../farm.selectors';

@Component({
    selector: 'app-farm',
    templateUrl: './farm.component.html',
    styleUrls: ['./farm.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmComponent {
    formState$: Observable<FarmForm> = this.store.select(FarmStoreSelectors.selectForm);
    edit$: Observable<boolean> = this.store.select(FarmStoreSelectors.selectEdit);
    error$: Observable<string> = this.store.select(FarmStoreSelectors.selectError);
    loading$: Observable<boolean> = this.store.select(FarmStoreSelectors.selectLoading);
    farms$: Observable<Farm[]> = this.store.select(FarmStoreSelectors.selectFarms);
    selectedFarmId$: Observable<string> = this.store.select(FarmStoreSelectors.selectSelectedFarmId);
    buttonStates$: Observable<boolean[]> = this.store.select(FarmStoreSelectors.selectButtonStates);

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
