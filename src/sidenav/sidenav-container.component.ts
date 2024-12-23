import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';
import {SidenavService} from './sidenav.service';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'ddr-mat-sidenav-container',
    templateUrl: './sidenav-container.component.html',
    standalone: false
})
export class SidenavContainerComponent implements OnInit, OnChanges, OnDestroy
{
    @ViewChild('sidenav', {static: true})
    public sidenav!: MatSidenav;

    @Input()
    public stayOpenOnLargeScreen = true;

    public mode$: Observable<MatDrawerMode>;

    public opened$: Observable<boolean>;

    private scrollSubscription!: Subscription;

    constructor(
        private sidenavService: SidenavService,
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

    /**
     * @override
     */
    public ngOnDestroy()
    {
        this.scrollSubscription.unsubscribe();
    }
}
