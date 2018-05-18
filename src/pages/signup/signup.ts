import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController, Events, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Storage} from '@ionic/storage';

//Validators
import {AgeValidator} from '../../validators/age';
import {EmailValidator} from '../../validators/email';

import {User} from '../../providers/providers';
import {MainPage} from '../pages';
import {LoginPage} from "../login/login";
import {ICustomFile} from "file-input-accessor";

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    @ViewChild('signupSlider') signupSlider: any;

    hide: boolean = true;

    account: any = [];

    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;
    slideFourForm: FormGroup;

    submitAttempt: boolean = false;

    //PP file imgfileList;
    fileList: ICustomFile[] = [];
    defaultbg = '../assets/img/profil.png';

    allowedFileTypes = '(jpe?g|jpeg|png)';
    allowedFileExt = '(.(jpe?g|jpeg|png)$)';
    withMeta = true;
    size = 1000000;

    // Our translated text strings
    private signupErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public evts: Events,
                public formBuilder: FormBuilder,
                public loadingCtrl: LoadingController,
                private storage: Storage) {

        //Form
        //Slide1
        this.slideOneForm = formBuilder.group({
            firstName: ['',
                Validators.compose([
                    Validators.maxLength(30),
                    Validators.pattern('^([áéíóúñÁÉÍÓÚÑäëïöüÄËÏÖÜçÇA-Za-z-]+)$'),
                    Validators.required]
                )],
            lastName: ['',
                Validators.compose([
                    Validators.maxLength(30),
                    Validators.pattern('^([áéíóúñÁÉÍÓÚÑäëïöüÄËÏÖÜçÇA-Za-z-]+)$'),
                    Validators.required]
                )]
        });

        //Slide2
        this.slideTwoForm = formBuilder.group({
            email: ['',
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
                EmailValidator.checkEmail],
            passWord: ['',
                Validators.compose([
                    Validators.minLength(8),
                    Validators.maxLength(50),
                    Validators.required,
                    Validators.pattern('^(?=.*[\\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\\w!@#$%^&*]{8,}$')]
                )]
        });

        //Slide3
        this.slideThreeForm = formBuilder.group({
            sex: [0, Validators.required],
            age: ['', AgeValidator.isValid],
            phone: ['',
                Validators.compose([
                    Validators.pattern('(\\+\\d+(\\s|-))?0\\d(\\s|-)?(\\d{2}(\\s|-)?){4}')]
                )]
        });

        //Slide4
        this.slideFourForm = formBuilder.group({
            file: ['']
        });

        this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
            this.signupErrorString = value;
        });
    }


    ionViewDidEnter() {
        //Slides forms
        this.FileUploadWatcher();
    }


    //Steps slider signup
    next() {
        this.signupSlider.slideNext();
    }

    prev() {
        this.signupSlider.slidePrev();
    }

    slideChanged() {
        let currentIndex = this.signupSlider.getActiveIndex();
        this.hide = currentIndex === 0;
    }

    save() {
        this.submitAttempt = true;

        if (!this.slideOneForm.valid) {
            this.signupSlider.slideTo(1);
        }
        else if (!this.slideTwoForm.valid) {
            this.signupSlider.slideTo(2);
        }
        else if (!this.slideThreeForm.valid) {
            this.signupSlider.slideTo(3);
        }
        else {
            this.account = this.account.concat(this.slideOneForm.value).concat(this.slideTwoForm.value).concat(this.slideThreeForm.value).concat(this.slideFourForm.value);
            this.doSignup();
        }
    }

    //goToLogin
    goToLogin() {
        this.navCtrl.setRoot(LoginPage);
    }

    //Signup
    doSignup() {
        // Attempt to sugnup in through our User service
        let loader = this.loadSpinner();
        loader.present().then(() => this.user.signup(this.account).subscribe((resp) => {
            this.navCtrl.push(MainPage);
            this.storage.set('id', resp['id']);
            let toast = this.toastCtrl.create({
                message: 'Connecté ! Bienvenu',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            loader.dismiss();
        }, (err) => {

            this.navCtrl.push(MainPage);

            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: "Oups, nous n'avons pas pu vous inscrire... ",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            loader.dismiss();
        }));
    }

//File
    FileUploadWatcher() {
        this.slideFourForm.get('file').valueChanges
            .subscribe((val) => {
                let errors = Object.keys(val[0].errors);
                if (errors.length === 0) {
                    this.fileList = this.fileList ? this.fileList = [val[0]] : [];
                }
            });
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
