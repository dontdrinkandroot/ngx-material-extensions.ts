import {EnvironmentProviders, inject, makeEnvironmentProviders, NgModule, provideEnvironmentInitializer} from '@angular/core';
import {SidenavToggleComponent} from './sidenav/sidenav-toggle.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import {DDR_MATERIAL_EXTENSIONS_THEME} from "./theme/theme-config";
import {ThemeScrollService} from "./theme/theme-scroll.service";
import {ToolbarFixedTopDirective} from "./toolbar/toolbar-fixed-top.directive";
import {FabFixedDirective} from "./button/fab-fixed.directive";

@NgModule({
    declarations: [
        FabFixedDirective,
        FilterComponent,
        SidenavToggleComponent,
        GridTileLazyImageContainerDirective,
        GridTileLazyImgDirective,
        SidenavContainerComponent,
        ToolbarFixedTopDirective
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatToolbarModule,
        ReactiveFormsModule
    ],
    exports: [
        FabFixedDirective,
        FilterComponent,
        SidenavToggleComponent,
        GridTileLazyImageContainerDirective,
        GridTileLazyImgDirective,
        SidenavContainerComponent,
        ToolbarFixedTopDirective
    ],
    providers: []
})
export class DdrMaterialExtensionsModule {
}

// TODO: I actually want to run this when the module is loaded, but haven't figured out the correct way for Angular 19 yet as the ENVIRONMENT_INITIALIZER Token is deprecated
export function provideDdrMaterialExtensions(): EnvironmentProviders {
    return makeEnvironmentProviders([
        ThemeScrollService,
        {
            provide: DDR_MATERIAL_EXTENSIONS_THEME,
            multi: false,
            useValue: {
                themeColorLight: '#fdfbff',
                themeColorDark: '#1a1b1f',
                themeColorLightScrolled: '#efedf1',
                themeColorDarkScrolled: '#1e1f23',
            }
        },
        provideEnvironmentInitializer(() => {
            inject(ThemeScrollService).init();
            inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-rounded');
        })
    ]);
}
