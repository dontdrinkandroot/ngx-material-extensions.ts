import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
    selector: '[ddrMatFabFixed]',
    standalone: false
})
export class FabFixedDirective implements OnInit {
    constructor(private el: ElementRef) {
    }

    /**
     * @override
     */
    public ngOnInit() {
        const container = document.createElement('div');
        container.classList.add('ddr-mat-fab-fixed-container');
        this.el.nativeElement.parentElement.insertBefore(container, this.el.nativeElement);
        container.appendChild(this.el.nativeElement);
    }
}
