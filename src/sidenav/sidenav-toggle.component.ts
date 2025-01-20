import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DdrMatSidenavService} from './sidenav.service';
import {toSignal} from '@angular/core/rxjs-interop';
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
    public visible;

    constructor(private sidenavService: DdrMatSidenavService) {
        this.visible = toSignal(this.sidenavService.watchToggleVisible(), {initialValue: false});
    }

    public toggleSidenav() {
        this.sidenavService.toggle();
    }
}
