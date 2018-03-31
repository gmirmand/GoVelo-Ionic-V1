import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InstantsearchProvider} from '../../providers/instantsearch/instantsearch';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private instantSearchService: InstantsearchProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AnnouncementPage');
        this.instantSearchService.search.start();
    }
}
