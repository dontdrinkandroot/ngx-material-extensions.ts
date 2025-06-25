import {Directive, ElementRef, inject, OnInit} from "@angular/core";

@Directive({
    selector: '[ddrMatFabFixed]',
})
export class DdrMatFabFixedDirective implements OnInit {

    private el = inject(ElementRef);

    private isInitialized = false;

    /**
     * @override
     */
    public ngOnInit() {
        if (this.isInitialized) {
            return;
        }

        // Check if container already exists
        const existingContainer = this.el.nativeElement.parentElement?.querySelector('.ddr-mat-fab-fixed-container');
        if (existingContainer && existingContainer.contains(this.el.nativeElement)) {
            this.isInitialized = true;
            return;
        }

        const container = document.createElement('div');
        container.classList.add('ddr-mat-fab-fixed-container');
        this.el.nativeElement.parentElement.insertBefore(container, this.el.nativeElement);
        container.appendChild(this.el.nativeElement);

        this.isInitialized = true;
    }
}
