import {Inject, Injectable} from '@angular/core';
import {MatDrawerMode, MatDrawerToggleResult, MatSidenav, MatSidenavContent} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SidenavService
{
    private sidenav!: MatSidenav;

    private sidenavContent!: MatSidenavContent;

    private stayOpenOnLargeScreen = false;

    private largeBreakpoints = [
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
    ];

    private screenLarge$: Observable<boolean>;

    private mode$: Observable<MatDrawerMode>;

    private opened$: Observable<boolean>;

    private sidenavContentScrolled$ = new BehaviorSubject<boolean>(false);

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
    )
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

    public setSidenavContent(sidenavContent: MatSidenavContent): void
    {
        this.sidenavContent = sidenavContent;
        this.sidenavContent.elementScrolled().pipe(
            map(() => this.sidenavContent.measureScrollOffset('top') > 0)
        ).subscribe(scrolled => {
            this.document.body.classList.toggle('scrolled', scrolled);
            this.sidenavContentScrolled$.next(scrolled);
        });
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

    public watchToggleVisible()
    {
        return this.screenLarge$.pipe(
            map(large => !large || !this.stayOpenOnLargeScreen)
        );
    }

    public watchContentScrolled()
    {
        return this.sidenavContentScrolled$.asObservable();
    }
}
