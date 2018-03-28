import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-splash',
    templateUrl: 'splash.html',
})
export class SplashPage {
    load: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SplashPage');
        setTimeout(() => {
            this.load = 1;
            setTimeout(() => {
                this.navCtrl.setRoot('TutorialPage');
            }, 2000)
        }, 2500)
    }

}