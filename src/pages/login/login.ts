import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController, Events} from 'ionic-angular';

import {User} from '../../providers/providers';
import {MainPage} from '../pages';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    login: {
        email: string,
        password: string,
    } = {
        email: '',
        password: '',
    };
    step: any;
    stepCondition: any;
    stepDefaultCondition: any;
    currentStep: any;

    // Our translated text strings
    private loginErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public evts: Events) {

        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
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

    // Attempt to login in through our User service
    doLogin() {
        this.user.login(this.login).subscribe((resp) => {
            this.navCtrl.push(MainPage);
        }, (err) => {
            this.navCtrl.push(MainPage);
            // Unable to log in
            let toast = this.toastCtrl.create({
                message: this.loginErrorString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    }

    //Wizard
    toggle() {
        this.stepCondition = !this.stepCondition;
    }

    forget() {
        //    ToDo
    }

    signup() {
        this.navCtrl.push('SignupPage');
    }
}
