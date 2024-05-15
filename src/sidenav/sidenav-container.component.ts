import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatDrawerMode, MatSidenav, MatSidenavContent} from '@angular/material/sidenav';
import {SidenavService} from './sidenav.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {distinctUntilChanged, Observable, startWith, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'ddr-mat-sidenav-container',
    templateUrl: './sidenav-container.component.html'
})
export class SidenavContainerComponent implements OnInit, OnChanges, OnDestroy
{
    @ViewChild('sidenav', {static: true})
    public sidenav!: MatSidenav;

    @ViewChild('sidenavContent', {static: true})
    public sidenavContent!: MatSidenavContent;

    @Input()
    public stayOpenOnLargeScreen = false;

    public mode$: Observable<MatDrawerMode> = this.sidenavService.getModeObservable();

    public opened$: Observable<boolean> = this.sidenavService.getOpenedObservable();

    private scrollSubscription!: Subscription;

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
        this.scrollSubscription = this.sidenavContent.elementScrolled().pipe(
            startWith(false),
            map(() => this.sidenavContent.measureScrollOffset('top') > 0),
            distinctUntilChanged(),
        ).subscribe(
            (scrolled) => this.sidenavContent.getElementRef().nativeElement.classList.toggle('scrolled', scrolled)
        );
    }

    /**
     * @override
     */
    public ngOnDestroy()
    {
        this.scrollSubscription.unsubscribe();
    }
}
