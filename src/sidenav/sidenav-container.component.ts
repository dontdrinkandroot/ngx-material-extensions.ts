import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {DdrMatSidenavService} from './sidenav.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgClass} from "@angular/common";

@Component({
    selector: 'ddr-mat-sidenav-container',
    templateUrl: './sidenav-container.component.html',
    imports: [
        AsyncPipe,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        NgClass
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DdrMatSidenavContainerComponent implements OnInit, OnChanges
{
    @ViewChild('sidenav', {static: true})
    public sidenav!: MatSidenav;

    @Input()
    public stayOpenOnLargeScreen = true;

    public mode$: Observable<MatDrawerMode>;

    public opened$: Observable<boolean>;

    constructor(
        private sidenavService: DdrMatSidenavService,
    )
    {
        this.mode$ = this.sidenavService.getModeObservable();
        this.opened$ = this.sidenavService.getOpenedObservable();
    }

    /**
     * @override
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        this.sidenavService.setStayOpenOnLargeScreen(changes['stayOpenOnLargeScreen'].currentValue);
    }

    /**
     * @override
     */
    public ngOnInit(): void
    {
        this.sidenavService.setSidenav(this.sidenav);
    }
}
