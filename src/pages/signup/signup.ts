import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController, Events} from 'ionic-angular';

import {User} from '../../providers/providers';
import {MainPage} from '../pages';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    account: {
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        confirmpassword: string,
        female: boolean,
        male: boolean,
        age: number,
        phone: string,
        img: string,
    } = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        female: undefined,
        male: undefined,
        age: undefined,
        phone: '',
        img: '',
    };
    step: any;
    stepCondition: any;
    stepDefaultCondition: any;
    currentStep: any;

    // Our translated text strings
    private signupErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public evts: Events) {

        this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
            this.signupErrorString = value;
        });

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

    step1(e) {
        this.stepCondition = !!(this.account.firstname && this.account.firstname.trim() !== '' && this.account.lastname && this.account.lastname.trim() !== '');
    }

    step2(e) {
        this.stepCondition = !!(this.account.email && this.account.email.trim() !== '' && this.account.password && this.account.password.trim() !== '' && this.account.confirmpassword && this.account.confirmpassword.trim() !== '');
    }

    step3(e) {
        this.stepCondition = ((this.account.female === true || this.account.male === true) && this.account.phone && this.account.phone.length === 10 && this.account.phone.trim() !== '' && this.account.age >= 18);
    }

    step4(e) {
        this.stepCondition = (1 === 1);
    }

    //Signup
    doSignup() {
        // Attempt to login in through our User service
        this.user.signup(this.account).subscribe((resp) => {
            this.navCtrl.push(MainPage);
        }, (err) => {

            this.navCtrl.push(MainPage);

            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: this.signupErrorString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    }
}
