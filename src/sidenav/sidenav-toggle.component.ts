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
    }
})
export class SidenavToggleComponent
{
    public visible = toSignal(this.sidenavService.watchToggleVisible(), {initialValue: false});

    constructor(private sidenavService: SidenavService)
    {
    }

    public toggleSidenav()
    {
        this.sidenavService.toggle();
    }
}
