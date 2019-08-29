import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
    AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile, tap } from 'rxjs/operators';
import { DxFormComponent } from 'devextreme-angular';

export interface FarmForm {
    name: string;
    area: number;
    number: string;
}

@Component({
    selector: 'app-farm-form',
    templateUrl: './farm-form.component.html',
    styleUrls: ['./farm-form.component.css'],
})
export class FarmFormComponent implements OnChanges, OnDestroy, AfterViewInit {
    @Input() edit = false;
    @Input() formState: FarmForm;
    @Output() updateForm = new EventEmitter<FarmForm>();

    @ViewChild('form', { static: true }) form: DxFormComponent;

    alive = true;

    ngAfterViewInit() {
        this.form.onFieldDataChanged
            .pipe(
                takeWhile(() => this.alive),
                tap(() => this.updateForm.emit(this.form.formData)),
            )
            .subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.formState && this.formState !== this.form.formData) {
            this.form.formData = this.formState;
        }
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
