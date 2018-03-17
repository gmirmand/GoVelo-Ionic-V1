import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AnnouncementDetailsPage} from "../pages";

/**
 * Generated class for the FindPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-find',
    templateUrl: 'find.html',
})

export class FindPage {
    step: any;
    stepCondition: any;
    stepDefaultCondition: any;
    currentStep: any;
    announcementId: null;
    find: {
        town: string,
        address: string,
        type1: boolean,
        type2: boolean,
        type3: boolean,
        type4: boolean,
        type5: boolean,
        started: String,
        ended: String,
        radius: number,
        price: any,
    } = {
        town: '',
        address: '',
        type1: false,
        type2: false,
        type3: false,
        type4: false,
        type5: false,
        started: undefined /*new Date().toISOString()*/,
        ended: undefined /*new Date().toISOString()*/,
        radius: null,
        price: {lower: 3, upper: 9},
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public evts: Events) {
        /**
         * Step Wizard Settings
         */
        this.announcementId = this.navParams.get('announcementId');
        this.step = 1;//The value of the first step, always 1
        this.stepCondition = false;//Set to true if you don't need condition in every step
        this.stepDefaultCondition = this.stepCondition;//Save the default condition for every step
        this.evts.subscribe('step:changed', step => {
            //Handle the current step if you need
            this.currentStep = step[0];
            //Set the step condition to the default value
            this.stepCondition = this.stepDefaultCondition;
        });
        this.evts.subscribe('step:next', () => {
            //Do something if next
            console.log('Next pressed: ', this.currentStep);
        });
        this.evts.subscribe('step:back', () => {
            //Do something if back
            console.log('Back pressed: ', this.currentStep);
        });
    }

    //Wizard
    toggle() {
        this.stepCondition = !this.stepCondition;
    }

    step1(e) {
        console.log(this.find.radius);
        this.stepCondition = !!(this.find.town && this.find.town.trim() !== ''
            && this.find.address && this.find.address.trim() !== ''
            && this.find.radius > 0);
    }

    step2(e) {
        console.log(this.find.type1);
        this.stepCondition = (
            this.find.type1
            || this.find.type2
            || this.find.type3
            || this.find.type4
            || this.find.type5);
    }

    step3(e) {
        this.stepCondition = !!(this.find.started && this.find.ended);
    }

    step4(e) {
        this.stepCondition = !!(this.find.started && this.find.ended);
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad FindPage');
        if (this.announcementId) {
            this.navCtrl.setRoot(AnnouncementDetailsPage);
        }
    }

    //Send form
    findForm() {

    }

}
