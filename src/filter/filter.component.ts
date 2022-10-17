import {
    AfterContentInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {interval, Subscription} from 'rxjs';
import {debounce} from 'rxjs/operators';

@Component({
    selector: 'ddr-filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit, OnDestroy, AfterContentInit
{
    public formControl: FormControl = new FormControl();

    @Output()
    public onFilterChanged = new EventEmitter<string>();

    @Input()
    public bouncePeriod = 500;

    @ViewChild('input', {static: true})
    public inputElement: ElementRef;

    private valueChangesSubscription: Subscription;

    /**
     * @override
     */
    public ngOnInit(): void
    {
        this.valueChangesSubscription = this.formControl.valueChanges
            .pipe(debounce(() => interval(this.bouncePeriod)))
            .subscribe((value => this.onFilterChanged.emit(value)));
    }

    /**
     * @override
     */
    public ngOnDestroy(): void
    {
        this.valueChangesSubscription.unsubscribe();
    }

    /**
     * @override
     */
    public ngAfterContentInit()
    {
        this.inputElement.nativeElement.focus();
    }


    public clear()
    {
        this.formControl.setValue(null);
        this.onFilterChanged.emit(null);
    }
}
