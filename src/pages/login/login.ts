import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController, Events} from 'ionic-angular';

import {User} from '../../providers/providers';
import {MainPage} from '../pages';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    account: any;

    logForm: FormGroup;

    submitAttempt: boolean = false;

    // Our translated text strings
    private loginErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public evts: Events,
                public formBuilder: FormBuilder) {

        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        });

        this.logForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]), EmailValidator.checkEmail],
            passWord: ['', Validators.required]
        });
    }

    save() {
        this.submitAttempt = true;

        if (this.logForm.valid) {
            console.log("success!");
            this.account = [];
            this.account = this.logForm.value;
            console.log(this.account);
            this.doLogin();
        }
    }

    // Attempt to login in through our User service
    doLogin() {
        this.user.login(this.account).subscribe((resp) => {
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
}
