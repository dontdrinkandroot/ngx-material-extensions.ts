import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {SidenavService} from './sidenav.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'ddr-mat-sidenav-container',
    templateUrl: './sidenav-container.component.html'
})
export class SidenavContainerComponent implements OnInit
{
    @ViewChild('sidenav', {static: true})
    public sidenav: MatSidenav;

    @Input()
    public stayOpenOnLargeScreen = false;

    public screenLarge$: Observable<boolean>;

    private largeBreakpoints = [
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
    ];

    constructor(private sidenavService: SidenavService, private breakpointObserver: BreakpointObserver)
    {
    }

    /**
     * @override
     */
    public ngOnInit(): void
    {
        this.sidenavService.setSidenav(this.sidenav);
        this.screenLarge$ = this.breakpointObserver.observe(this.largeBreakpoints).pipe(
            map(result => result.matches)
        );
    }

    public closeSidebar(): void
    {
        if (!(this.stayOpenOnLargeScreen && this.breakpointObserver.isMatched(this.largeBreakpoints))) {
            this.sidenav.close();
        }
    }
}
