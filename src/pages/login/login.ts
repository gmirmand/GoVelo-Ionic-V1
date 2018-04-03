import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController, Events, LoadingController} from 'ionic-angular';

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
                public loadingCtrl: LoadingController,
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
            this.account = [];
            this.account = this.logForm.value;
            this.doLogin();
        }
    }

    // Attempt to login in through our User service
    doLogin() {
        let loader = this.loadSpinner();
        //Will be remove
        let ok: boolean = false;
        let self = this;
        loader.present().then(() => this.user.login(this.account).subscribe((resp) => {
            console.log(resp);
            resp['hydra:member'].forEach(function (user) {
                if (user.email.toLowerCase() == self.account.email) {
                    ok = true;
                }
            });
            loader.dismiss();
            this.afterLogin(ok);
        }, (err) => {
            loader.dismiss();
            this.afterLogin(ok);
        }));
    }

    afterLogin(ok){
        if (ok) {
            this.navCtrl.push(MainPage);
            let toast = this.toastCtrl.create({
                message: 'Connecté !',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        } else {
            this.navCtrl.push(MainPage);
            // Unable to log in
            let toast = this.toastCtrl.create({
                message: "Oups, nous n'avons pas pu vous connecter...",
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    }

//    Loading controller
    loadSpinner() {
        return this.loadingCtrl.create({
            spinner: 'hide',
            content: `
                <img src="assets/icon/spinner.gif"/>
            `
        });
    }
}
