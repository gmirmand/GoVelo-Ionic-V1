import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InstantsearchProvider} from '../../providers/instantsearch/instantsearch';
import {AnnouncementDetailsPage} from "../announcement-details/announcement-details";

/**
 * Generated class for the AnnouncementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-announcement',
    templateUrl: 'announcement.html',
})
export class AnnouncementPage {
    active: boolean = false;
    load: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private instantSearchService: InstantsearchProvider) {
        this.instantSearchService.search.start();
    }

    clickFilter() {
        this.active = !this.active;
    }

    goToDetail() {
        this.navCtrl.push('AnnouncementDetailsPage', {}, {animate: true, direction: 'forward'});
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AnnouncementPage');
    }

    doRefresh(refresher) {
        this.instantSearchService.search.refresh();

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
}
