import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';
import {SidenavService} from './sidenav.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable} from 'rxjs';

@Component({
    selector: 'ddr-mat-sidenav-container',
    templateUrl: './sidenav-container.component.html'
})
export class SidenavContainerComponent implements OnInit, OnChanges
{
    @ViewChild('sidenav', {static: true})
    public sidenav!: MatSidenav;

    @Input()
    public stayOpenOnLargeScreen = false;

    public mode$: Observable<MatDrawerMode> = this.sidenavService.getModeObservable();

    public opened$: Observable<boolean> = this.sidenavService.getOpenedObservable();

    constructor(private sidenavService: SidenavService, private breakpointObserver: BreakpointObserver)
    {
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
