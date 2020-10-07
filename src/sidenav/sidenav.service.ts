import {Injectable} from '@angular/core';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})

export class SidenavService
{
    private sidenav: MatSidenav;

    public setSidenav(sidenav: MatSidenav)
    {
        this.sidenav = sidenav;
    }

    public toggle(): Promise<MatDrawerToggleResult>
    {
        return this.sidenav.toggle();
    }
}
