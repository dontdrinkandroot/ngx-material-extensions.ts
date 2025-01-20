import {AfterContentInit, ContentChildren, Directive, HostListener, OnDestroy, QueryList} from '@angular/core';
import {DdrMatGridTileLazyImgDirective} from './grid-tile-lazy-img.directive';
import {Subscription} from 'rxjs';
import {Debounce, Limit} from '@dontdrinkandroot/ngx-extensions';

@Directive({
    selector: '[ddrMatGridTileLazyImgContainer]'
})
export class DdrMatGridTileLazyImageContainerDirective implements AfterContentInit, OnDestroy
{
    @ContentChildren(DdrMatGridTileLazyImgDirective, {descendants: true})
    lazyImages!: QueryList<DdrMatGridTileLazyImgDirective>;

    private changeSubscription!: Subscription;

    @HostListener('window:resize', ['$event'])
    @Debounce()
    public windowResized()
    {
        if (null != this.lazyImages) {
            this.lazyImages.forEach((lazyImage: DdrMatGridTileLazyImgDirective) => lazyImage.recheck());
        }
    }

    @HostListener('window:scroll', ['$event'])
    @Limit()
    public windowScroll()
    {
        if (null != this.lazyImages) {
            this.lazyImages.forEach((lazyImage: DdrMatGridTileLazyImgDirective) => lazyImage.check());
        }
    }

    /**
     * @override
     */
    public ngAfterContentInit(): void
    {
        this.lazyImages.forEach((lazyImage: DdrMatGridTileLazyImgDirective) => lazyImage.check());
        this.changeSubscription = this.lazyImages.changes.subscribe(() => {
            /* Wait one tick until layout is ready */
            setTimeout(
                () => this.lazyImages.forEach((lazyImage: DdrMatGridTileLazyImgDirective) => lazyImage.recheck())
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
