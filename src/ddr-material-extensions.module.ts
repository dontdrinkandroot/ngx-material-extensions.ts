import {EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DDR_MAT_THEME} from "./theme/theme-config";
import {DdrMatThemeScrollService} from "./theme/theme-scroll.service";

export function provideDdrMaterialExtensions(): EnvironmentProviders {
    return makeEnvironmentProviders([
        DdrMatThemeScrollService,
        {
            provide: DDR_MAT_THEME,
            multi: false,
            useValue: {
                themeColorLight: '#fdfbff',
                themeColorDark: '#1a1b1f',
                themeColorLightScrolled: '#efedf1',
                themeColorDarkScrolled: '#1e1f23',
            }
        },
        provideEnvironmentInitializer(() => {
            inject(DdrMatThemeScrollService).init();
            inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-rounded');
        })
    ]);
}
