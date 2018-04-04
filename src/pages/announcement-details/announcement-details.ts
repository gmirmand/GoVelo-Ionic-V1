import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnnouncementDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-announcement-details',
  templateUrl: 'announcement-details.html',
})
export class AnnouncementDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  profil() {
    this.navCtrl.push('ProfilPage');
  }
    velos_user() {
        this.navCtrl.push('ProfilPage');
    }
    chats() {
        this.navCtrl.push('MessagePage');
    }
    rental() {
        this.navCtrl.push('LoginPage');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementDetailsPage');
  }

}
