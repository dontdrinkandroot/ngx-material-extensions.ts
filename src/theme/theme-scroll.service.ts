import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {distinctUntilChanged, fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import {DDR_MAT_THEME, DdrMatThemeConfig} from "./theme-config";

@Injectable()
export class DdrMatThemeScrollService {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(DDR_MAT_THEME) private readonly themeConfig: DdrMatThemeConfig
    ) {
    }

    public init() {
        const lightMetaElement = this.findOrCreateThemeColorMetaElement('(prefers-color-scheme: light)', this.themeConfig.themeColorLight);
        const darkMetaElement = this.findOrCreateThemeColorMetaElement('(prefers-color-scheme: dark)', this.themeConfig.themeColorDark);

        fromEvent(this.document, 'scroll')
            .pipe(
                map(() => this.document.documentElement.scrollTop > 0),
                distinctUntilChanged()
            ).subscribe((scrolled) => {
            this.document.body.classList.toggle('ddr-mat-scrolled', scrolled);
            lightMetaElement.content = scrolled ? this.themeConfig.themeColorLightScrolled : this.themeConfig.themeColorLight;
            darkMetaElement.content = scrolled ? this.themeConfig.themeColorDarkScrolled : this.themeConfig.themeColorDark;
        });
    }

    private findOrCreateThemeColorMetaElement(media: string, content: string) {
        let metaElement = this.document.head.querySelector<HTMLMetaElement>(`meta[name="theme-color"][media="${media}"]`);
        if (null == metaElement) {
            metaElement = this.createThemeColorMetaElement(media, content);
        }
        return metaElement;
    }

    private createThemeColorMetaElement(media: string, content: string) {
        const metaElement = this.document.createElement('meta');
        metaElement.name = 'theme-color';
        metaElement.media = media;
        metaElement.content = content;
        this.document.head.appendChild(metaElement);

        return metaElement;
    }
}
