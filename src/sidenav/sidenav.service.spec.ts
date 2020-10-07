import {SidenavService} from './sidenav.service';

describe('SidenavService', () => {
    it('can be constructed without dependencies', () => {
        const sidenavService = new SidenavService();
        expect(sidenavService).toBeDefined();
    });
});
