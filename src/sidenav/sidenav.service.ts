import {Injectable} from '@angular/core';
import {MatDrawerMode, MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SidenavService
{
    private sidenav: MatSidenav;

    private stayOpenOnLargeScreen = false;

    private largeBreakpoints = [
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
    ];

    private screenLarge$: Observable<boolean>;

    private mode$: Observable<MatDrawerMode>;

    private opened$: Observable<boolean>;

    constructor(private breakpointObserver: BreakpointObserver, private router: Router)
    {
        this.screenLarge$ = this.breakpointObserver.observe(this.largeBreakpoints).pipe(
            map(result => result.matches)
        );
        this.mode$ = this.screenLarge$.pipe(
            map(large => large && this.stayOpenOnLargeScreen ? 'side' : 'over')
        );
        this.opened$ = this.screenLarge$.pipe(
            map(large => large && this.stayOpenOnLargeScreen)
        );
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.closeSidebar();
            }
        });
    }

    public setSidenav(sidenav: MatSidenav): void
    {
        this.sidenav = sidenav;
    }

    public getStayOpenOnLargeScreen(): boolean
    {
        return this.stayOpenOnLargeScreen;
    }

    public setStayOpenOnLargeScreen(value: boolean): void
    {
        this.stayOpenOnLargeScreen = value;
    }

    public toggle(): Promise<MatDrawerToggleResult>
    {
        if (null == this.sidenav) {
            return Promise.reject('No MatSidenav found. Use setSidenav() of SidenavService');
        }

        if (!(this.stayOpenOnLargeScreen && this.breakpointObserver.isMatched(this.largeBreakpoints))) {
            return this.sidenav.toggle();
        }

        return Promise.resolve(this.sidenav.opened ? 'open' : 'close');
    }

    public closeSidebar(): void
    {
        if (!(this.stayOpenOnLargeScreen && this.breakpointObserver.isMatched(this.largeBreakpoints))) {
            this.sidenav.close();
        }
    }

    public getModeObservable(): Observable<MatDrawerMode>
    {
        return this.mode$;
    }

    public getOpenedObservable(): Observable<boolean>
    {
        return this.opened$;
    }
}
