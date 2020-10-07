import {NgModule} from '@angular/core';
import {SidenavToggleComponent} from './sidenav/sidenav-toggle.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {GridTileLazyImageContainerDirective} from './gridlist/grid-tile-lazy-image-container.directive';
import {GridTileLazyImgDirective} from './gridlist/grid-tile-lazy-img.directive';

@NgModule({
    declarations: [
        SidenavToggleComponent,
        GridTileLazyImageContainerDirective,
        GridTileLazyImgDirective
    ],
    imports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        SidenavToggleComponent,
        GridTileLazyImageContainerDirective,
        GridTileLazyImgDirective
    ]
})
export class DdrMaterialExtensionsModule
{
}
