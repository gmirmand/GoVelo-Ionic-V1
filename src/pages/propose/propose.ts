import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ProposePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-propose',
    templateUrl: 'propose.html',
})
export class ProposePage {
    step: any;
    stepCondition: any;
    stepDefaultCondition: any;
    currentStep: any;
    propose: { title: string, description: string, img1: string, type1: string, type2: string, type3: string, type4: string, type5: string, town: string, address: string, price: string, started: string, ended:string, bankname:string, RIB:string, locker:string } = {
        title: '',
        description: '',
        img1: '',
        type1: '',
        type2: '',
        type3: '',
        type4: '',
        type5: '',
        town: '',
        address: '',
        price: '',
        started: '',
        ended: '',
        bankname: '',
        RIB: '',
        locker: ''
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public evts: Events) {
        /**
         * Step Wizard Settings
         */
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProposePage');
    }

}
