import {inject, Injectable, signal} from '@angular/core';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationStart, Router} from '@angular/router';
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class DdrMatSidenavService {

    private breakpointObserver = inject(BreakpointObserver);

    private router = inject(Router);

    private sidenav!: MatSidenav;

    private largeBreakpoints = [
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
    ];

    public stayOpenOnLargeScreen = signal(true);

    private stayOpenOnLargeScreen$ = toObservable(this.stayOpenOnLargeScreen);

    private sidenavContentScrolled$ = new BehaviorSubject<boolean>(false);

    public readonly mode;

    public readonly opened;

    public readonly toggleVisible;

    constructor() {
        const screenLarge$ = this.breakpointObserver.observe(this.largeBreakpoints).pipe(
            map(result => result.matches)
        );

        const mode$ = combineLatest([
            screenLarge$,
            this.stayOpenOnLargeScreen$
        ]).pipe(
            map(([large, stayOpenOnLargeScreen]) => large && stayOpenOnLargeScreen ? 'side' : 'over'),
        );

        const opened$ = combineLatest([
            screenLarge$,
            this.stayOpenOnLargeScreen$
        ]).pipe(
            map(([large, stayOpenOnLargeScreen]) => large && stayOpenOnLargeScreen),
        );

        const toggleVisible$ = combineLatest([
            screenLarge$,
            this.stayOpenOnLargeScreen$
        ]).pipe(
            map(([large, stayOpenOnLargeScreen]) => !large || !stayOpenOnLargeScreen),
        );

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.closeSidebar();
            }
        });

        this.mode = toSignal(mode$, {initialValue: 'over'});
        this.opened = toSignal(opened$, {initialValue: false});
        this.toggleVisible = toSignal(toggleVisible$, {initialValue: true});
    }

    public setSidenav(sidenav: MatSidenav): void {
        this.sidenav = sidenav;
    }

    public toggle(): Promise<MatDrawerToggleResult> {
        if (null == this.sidenav) {
            return Promise.reject('No MatSidenav found. Use setSidenav() of SidenavService');
        }

        if (!(this.stayOpenOnLargeScreen() && this.breakpointObserver.isMatched(this.largeBreakpoints))) {
            return this.sidenav.toggle();
        }

        return Promise.resolve(this.sidenav.opened ? 'open' : 'close');
    }

    public closeSidebar(): void {
        if (!(this.stayOpenOnLargeScreen() && this.breakpointObserver.isMatched(this.largeBreakpoints))) {
            this.sidenav.close();
        }
    }

    public watchContentScrolled() {
        return this.sidenavContentScrolled$.asObservable();
    }
}
