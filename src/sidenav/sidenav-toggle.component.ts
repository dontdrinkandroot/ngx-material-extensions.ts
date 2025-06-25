import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {DdrMatSidenavService} from './sidenav.service';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
    selector: 'ddr-mat-sidenav-toggle',
    template: `
        <button mat-icon-button (click)="toggleSidenav()">
            <mat-icon>menu</mat-icon>
        </button>`,
    imports: [
        MatIcon,
        MatIconButton
    ],
    host: {
        '[style.display]': 'visible() ? "block" : "none"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DdrMatSidenavToggleComponent {
    private sidenavService = inject(DdrMatSidenavService);

    public visible;

    constructor() {
        this.visible = this.sidenavService.toggleVisible;
    }

    public toggleSidenav() {
        this.sidenavService.toggle();
    }
}
