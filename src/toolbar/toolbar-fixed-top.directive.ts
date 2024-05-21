import {Directive, ElementRef, Input, OnInit} from "@angular/core";

@Directive({
    selector: '[ddrMatToolbarFixedTop]'
})
export class ToolbarFixedTopDirective implements OnInit {

    @Input()
    public ddrMatToolbarFixedTop?: string = undefined;

    constructor(private el: ElementRef) {
    }

    /**
     * @override
     */
    public ngOnInit() {
        const container = document.createElement('div');
        container.classList.add('ddr-mat-toolbar-fixed-top-container');
        this.el.nativeElement.parentElement.insertBefore(container, this.el.nativeElement);
        container.appendChild(this.el.nativeElement);

        if (this.ddrMatToolbarFixedTop != null && '' !== this.ddrMatToolbarFixedTop) {
            container.classList.add(this.ddrMatToolbarFixedTop);
        }
    }
}
