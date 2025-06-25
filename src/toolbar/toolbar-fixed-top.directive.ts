import {Directive, ElementRef, Input, OnInit, inject} from '@angular/core';

@Directive({
    selector: '[ddrMatToolbarFixedTop]'
})
export class DdrMatToolbarFixedTopDirective implements OnInit {
    private el = inject(ElementRef);

    @Input()
    public ddrMatToolbarFixedTop: string[] | '' = '';

    private isInitialized = false;

    /**
     * @override
     */
    public ngOnInit() {
        if (this.isInitialized) {
            return;
        }

        // Check if container already exists
        const existingContainer = this.el.nativeElement.parentElement?.querySelector('.ddr-mat-toolbar-fixed-top-container');
        if (existingContainer && existingContainer.contains(this.el.nativeElement)) {
            this.isInitialized = true;
            return;
        }

        const container = document.createElement('div');
        container.classList.add('ddr-mat-toolbar-fixed-top-container');
        this.el.nativeElement.parentElement.insertBefore(container, this.el.nativeElement);
        container.appendChild(this.el.nativeElement);

        if ('' !== this.ddrMatToolbarFixedTop) {
            this.ddrMatToolbarFixedTop.forEach((className: string) => {
                container.classList.add(className);
            });
        }

        this.isInitialized = true;
    }
}
