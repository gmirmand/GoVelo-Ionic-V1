import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController} from 'ionic-angular';

import {tabProposeRoot} from '../pages';
import {tabFindRoot} from '../pages';
import {tabHomeRoot} from '../pages';
import {tabMessageRoot} from '../pages';
import {tabProfilRoot} from '../pages';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tabProposeRoot: any = tabProposeRoot;
    tabFindRoot: any = tabFindRoot;
    tabHomeRoot: any = tabHomeRoot;
    tabMessageRoot: any = tabMessageRoot;
    tabProfilRoot: any = tabProfilRoot;

    tabProposeTitle = " ";
    tabFindTitle = " ";
    tabHomeTitle = " ";
    tabMessageTitle = " ";
    tabProfilTitle = " ";

    constructor(public navCtrl: NavController, public translateService: TranslateService) {
        translateService.get(['TAB_PROPOSE', 'TAB_FIND', 'TAB_HOME', 'TAB_MESSAGE', 'TAB_PROFIL']).subscribe(values => {
            this.tabProposeTitle = values['TAB_PROPOSE'];
            this.tabFindTitle = values['TAB_FIND'];
            this.tabHomeTitle = values['TAB_HOME'];
            this.tabMessageTitle = values['TAB_MESSAGE'];
            this.tabProfilTitle = values['TAB_PROFIL'];
        });
    }
}
