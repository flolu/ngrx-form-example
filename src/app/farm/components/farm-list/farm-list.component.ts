import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Farm } from 'src/app/entities/farm';

@Component({
    selector: 'app-farm-list',
    templateUrl: './farm-list.component.html',
    styleUrls: ['./farm-list.component.css'],
})
export class FarmListComponent {
    @Input() farms: Farm[];
    @Input() selectedFarmId: string;
    @Output() selectFarm = new EventEmitter<string>();

    onSelect = (id: string) => this.selectFarm.emit(id);
}
