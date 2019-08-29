import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-farm-buttons',
    templateUrl: './farm-buttons.component.html',
    styleUrls: ['./farm-buttons.component.css'],
})
export class FarmButtonsComponent {
    @Input() states: boolean[] = [];
    @Output() add = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() delete = new EventEmitter();

    onAdd = () => this.add.emit();
    onEdit = () => this.edit.emit();
    onSave = () => this.save.emit();
    onCancel = () => this.cancel.emit();
    onDelete = () => this.delete.emit();
}
