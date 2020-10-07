import {AfterContentInit, ContentChildren, Directive, HostListener, OnDestroy, QueryList} from '@angular/core';
import {GridTileLazyImgDirective} from './grid-tile-lazy-img.directive';
import {Subscription} from 'rxjs';
import {Debounce, Limit} from '@dontdrinkandroot/ngx-extensions';

@Directive({selector: '[ddrGridTileLazyImgContainer]'})
export class GridTileLazyImageContainerDirective implements AfterContentInit, OnDestroy
{
    @ContentChildren(GridTileLazyImgDirective, {descendants: true}) lazyImages: QueryList<GridTileLazyImgDirective>;

    private changeSubscription: Subscription;

    @HostListener('window:resize', ['$event'])
    @Debounce()
    public windowResized($event: Event)
    {
        if (null != this.lazyImages) {
            this.lazyImages.forEach((lazyImage: GridTileLazyImgDirective, index) => lazyImage.recheck());
        }
    }

    @HostListener('window:scroll', ['$event'])
    @Limit()
    public windowScroll($event: Event)
    {
        if (null != this.lazyImages) {
            this.lazyImages.forEach((lazyImage: GridTileLazyImgDirective, index) => lazyImage.check());
        }
    }

    /**
     * @override
     */
    public ngAfterContentInit(): void
    {
        this.lazyImages.forEach((lazyImage: GridTileLazyImgDirective, index) => lazyImage.check());
        this.changeSubscription = this.lazyImages.changes.subscribe(() => {
            /* Wait one tick until layout is ready */
            setTimeout(
                () => this.lazyImages.forEach((lazyImage: GridTileLazyImgDirective, index) => lazyImage.recheck())
                , 1
            );
        });
    }

    /**
     * @override
     */
    public ngOnDestroy(): void
    {
        this.changeSubscription.unsubscribe();
    }
}
