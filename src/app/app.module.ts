import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FarmModule } from './farm/farm.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FarmModule, StoreDevtoolsModule.instrument()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
