import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';

import {CalendarComponentOptions} from 'ion2-calendar';

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
    disabled: boolean = true;
    propose: {
        title: string,
        description: string,
        img: FileList,
        picnb: number,
        type: boolean,
        town: string,
        address: string,
        price: number,
        started: string,
        ended: string,
        bankname: string,
        RIB: string,
        lock1: number,
        lock2: number,
        lock3: number,
        lock4: number,
        dateRange: {
            from: string,
            to: string
        },
        dateRangeArray: any[]
    } = {
        title: '',
        description: '',
        img: undefined,
        picnb: 0,
        type: false,
        town: '',
        address: '',
        price: null,
        started: '',
        ended: '',
        bankname: '',
        RIB: '',
        lock1: null,
        lock2: null,
        lock3: null,
        lock4: null,
        dateRange: undefined,
        dateRangeArray: []
    };
    type: 'js-date'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
    optionsRange: CalendarComponentOptions = {
        pickMode: 'range'
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

    //Steps
    step1(e) {
        this.stepCondition = !!(this.propose.title && this.propose.title.trim() !== ''
            && this.propose.description && this.propose.description.trim() !== '');
    }

    step2(e) {
        this.propose.img = e.target.files;
        this.propose.picnb = this.propose.img.length;
        this.stepCondition = (this.propose.picnb > 0);
    }

    step3(e) {
        this.stepCondition = (this.propose.type);
    }

    step4(e) {
        this.stepCondition = !!(this.propose.town && this.propose.town.trim() !== ''
            && this.propose.address && this.propose.address.trim() !== '');
    }

    step5(e) {
        this.stepCondition = (this.propose.price && this.propose.price < 50);
    }

    step6(e) {
        this.disabled = false;
        this.stepCondition = (this.propose.dateRangeArray.length > 0);
    }

    step7(e) {
        // this.stepCondition = (this.propose.bankname && this.propose.bankname.trim() !== '' && this.propose.RIB && this.propose.RIB.trim() !== '');
    }

    addCalendar() {
        if (this.propose.dateRange.from) {
            this.disabled = true;
            if (!this.propose.dateRange.to)
                this.propose.dateRange.to = this.propose.dateRange.from;
            this.propose.dateRangeArray.push(this.propose.dateRange);
        }
        this.step6(this.evts);
    }

    delete(index) {
        this.propose.dateRangeArray.splice(index, 1);
    }

    proposeForm() {
        console.log('test');
        this.navCtrl.parent.select(3);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProposePage');
        this.toggle();
    }
}
