import {Injectable} from '@angular/core';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class SidenavService
{
    private sidenav: MatSidenav;

    public setSidenav(sidenav: MatSidenav): void
    {
        this.sidenav = sidenav;
    }

    public toggle(): Promise<MatDrawerToggleResult>
    {
        if (null == this.sidenav) {
            return Promise.reject('No MatSidenav found. Use setSidenav() of SidenavService');
        }

        return this.sidenav.toggle();
    }
}
