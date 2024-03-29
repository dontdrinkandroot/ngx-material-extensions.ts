import {NgModule} from '@angular/core';
import {SidenavToggleComponent} from './sidenav/sidenav-toggle.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {GridTileLazyImageContainerDirective} from './gridlist/grid-tile-lazy-image-container.directive';
import {GridTileLazyImgDirective} from './gridlist/grid-tile-lazy-img.directive';
import {SidenavContainerComponent} from './sidenav/sidenav-container.component';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './filter/filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [
        FilterComponent,
        SidenavToggleComponent,
        GridTileLazyImageContainerDirective,
        GridTileLazyImgDirective,
        SidenavContainerComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    exports: [
        FilterComponent,
        SidenavToggleComponent,
        GridTileLazyImageContainerDirective,
        GridTileLazyImgDirective,
        SidenavContainerComponent
    ]
})
export class DdrMaterialExtensionsModule
{
}
