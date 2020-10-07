import {Component} from '@angular/core';
import {SidenavService} from './sidenav.service';

@Component({
    selector: 'ddr-mat-sidenav-toggle',
    template: `
        <button mat-icon-button (click)="toggleSidenav()">
            <mat-icon>menu</mat-icon>
        </button>`
})
export class SidenavToggleComponent
{
    constructor(private sidenavService: SidenavService)
    {
    }

    public toggleSidenav()
    {
        this.sidenavService.toggle();
    }
}
