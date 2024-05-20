import {InjectionToken} from "@angular/core";

export const DDR_MATERIAL_EXTENSIONS_THEME = new InjectionToken<ThemeConfig>('DDR_MATERIAL_EXTENSIONS_THEME');

export interface ThemeConfig {
    themeColorLight: string,
    themeColorDark: string,
    themeColorLightScrolled: string,
    themeColorDarkScrolled: string,
}
