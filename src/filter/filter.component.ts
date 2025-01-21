import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, input, Input, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {interval} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {outputFromObservable} from "@angular/core/rxjs-interop";

@Component({
    selector: 'ddr-mat-filter',
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss',
    imports: [
        MatIconButton,
        MatCard,
        MatFormField,
        MatIcon,
        MatInput,
        MatSuffix,
        ReactiveFormsModule,
        MatPrefix
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DdrMatFilterComponent implements AfterContentInit
{
    protected formControl = new FormControl<string | null>(null);

    public filterChanged = outputFromObservable(
        this.formControl.valueChanges
            .pipe(debounce(() => interval(this.bouncePeriod)))
    );

    @Input()
    public bouncePeriod = 500;

    public ddrMatPrefixIcon = input<string | null>(null);

    @ViewChild('input', {static: true})
    protected inputElement!: ElementRef;

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
    }
}
