import {ChangeDetectionStrategy, Component, effect, input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {DdrMatSidenavService} from './sidenav.service';
import {NgClass} from "@angular/common";

@Component({
    selector: 'ddr-mat-sidenav-container',
    templateUrl: './sidenav-container.component.html',
    styleUrl: './sidenav-container.component.scss',
    imports: [
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        NgClass
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DdrMatSidenavContainerComponent implements OnInit {
    @ViewChild('sidenav', {static: true})
    public sidenav!: MatSidenav;

    public stayOpenOnLargeScreen = input<boolean>(true);

    protected mode;

    protected opened;

    constructor(
        private sidenavService: DdrMatSidenavService,
    ) {
        this.mode = this.sidenavService.mode;
        this.opened = this.sidenavService.opened;

        effect(() => {
            this.sidenavService.stayOpenOnLargeScreen.set(this.stayOpenOnLargeScreen());
        });
    }

    /**
     * @override
     */
    public ngOnInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }
}
