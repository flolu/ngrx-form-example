import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile, tap } from 'rxjs/operators';

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
export class FarmFormComponent implements OnChanges, OnDestroy {
    @Input() edit = false;
    @Input() formState: FarmForm;
    @Output() updateForm = new EventEmitter<FarmForm>();

    form: FormGroup = new FormGroup({
        name: new FormControl(),
        number: new FormControl(),
        area: new FormControl(),
    });
    alive = true;

    constructor() {
        this.form.valueChanges
            .pipe(
                takeWhile(() => this.alive),
                debounceTime(100),
                tap(value => this.updateForm.emit(value)),
            )
            .subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.formState && this.formState !== this.form.value) {
            this.form.patchValue(this.formState);
        }
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
