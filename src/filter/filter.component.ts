import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {interval} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {outputFromObservable} from "@angular/core/rxjs-interop";

@Component({
    selector: 'ddr-mat-filter',
    templateUrl: './filter.component.html',
    imports: [
        MatIconButton,
        MatCard,
        MatFormField,
        MatIcon,
        MatInput,
        MatSuffix,
        ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DdrMatFilterComponent implements AfterContentInit
{
    public formControl = new FormControl<string | null>(null);

    public filterChanged = outputFromObservable(
        this.formControl.valueChanges
            .pipe(debounce(() => interval(this.bouncePeriod)))
    );

    @Input()
    public bouncePeriod = 500;

    @ViewChild('input', {static: true})
    public inputElement!: ElementRef;

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
        // this.filterChanged.emit(null);
    }
}
