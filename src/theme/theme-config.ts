import {InjectionToken} from "@angular/core";

export const DDR_MAT_THEME = new InjectionToken<DdrMatThemeConfig>('DDR_MAT_THEME');

export interface DdrMatThemeConfig {
    themeColorLight: string,
    themeColorDark: string,
    themeColorLightScrolled: string,
    themeColorDarkScrolled: string,
}
