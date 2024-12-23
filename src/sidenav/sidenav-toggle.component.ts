import {Component} from '@angular/core';
import {SidenavService} from './sidenav.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
    selector: 'ddr-mat-sidenav-toggle',
    template: `
        <button mat-icon-button (click)="toggleSidenav()">
            <mat-icon>menu</mat-icon>
        </button>`,
    host: {
        '[style.display]': 'visible() ? "block" : "none"'
    },
    standalone: false
})
export class SidenavToggleComponent {
    public visible;

    constructor(private sidenavService: SidenavService) {
        this.visible = toSignal(this.sidenavService.watchToggleVisible(), {initialValue: false});
    }

    public toggleSidenav() {
        this.sidenavService.toggle();
    }
}
