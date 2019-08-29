import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DxFormModule } from 'devextreme-angular';
import { components } from './components';
import { containers } from './containers';
import { FarmComponent } from './containers/farm/farm.component';
import { DisableControlDirective } from './disable-control.directive';
import { FarmEffects } from './farm.effects';
import { farmReducer } from './farm.reducer';

@NgModule({
    declarations: [...containers, ...components, DisableControlDirective],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot({ farm: farmReducer }),
        EffectsModule.forRoot([FarmEffects]),
        DxFormModule,
    ],
    exports: [FarmComponent],
})
export class FarmModule {}
