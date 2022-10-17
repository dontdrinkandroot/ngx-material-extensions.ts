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
        MatSidenavModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        SidenavToggleComponent,
        GridTileLazyImageContainerDirective,
        GridTileLazyImgDirective,
        SidenavContainerComponent
    ]
})
export class DdrMaterialExtensionsModule
{
}
