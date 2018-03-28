import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController, Events} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

//Validators
import {AgeValidator} from '../../validators/age';
import {EmailValidator} from '../../validators/email';

import {User} from '../../providers/providers';
import {MainPage} from '../pages';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    @ViewChild('signupSlider') signupSlider: any;

    account: any = [];

    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;
    slideFourForm: FormGroup;

    submitAttempt: boolean = false;

    // Our translated text strings
    private signupErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public evts: Events,
                public formBuilder: FormBuilder) {

        //Form
        //Slide1
        this.slideOneForm = formBuilder.group({
            firstName: ['ToRemove',
                Validators.compose([
                    Validators.maxLength(30),
                    Validators.pattern('^([áéíóúñÁÉÍÓÚÑäëïöüÄËÏÖÜçÇA-Za-z-]+)$'),
                    Validators.required]
                )],
            lastName: ['ToRemove',
                Validators.compose([
                    Validators.maxLength(30),
                    Validators.pattern('^([áéíóúñÁÉÍÓÚÑäëïöüÄËÏÖÜçÇA-Za-z-]+)$'),
                    Validators.required]
                )]
        });

        //Slide2
        this.slideTwoForm = formBuilder.group({
            email: ['ToRemove@ToRemove.ToRemove',
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
                EmailValidator.checkEmail],
            passWord: ['ToRemove00*',
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
            age: [20, AgeValidator.isValid],
            phone: ['0404040404',
                Validators.compose([
                    Validators.required,
                    Validators.pattern('(\\+\\d+(\\s|-))?0\\d(\\s|-)?(\\d{2}(\\s|-)?){4}')]
                )]
        });

        //Slide4
        this.slideFourForm = formBuilder.group({
            profilPicture: ['']
        });

        this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
            this.signupErrorString = value;
        });
    }


    //Steps slider signup
    next() {
        this.signupSlider.slideNext();
    }

    prev() {
        this.signupSlider.slidePrev();
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
        else if (!this.slideFourForm.valid) {
            this.signupSlider.slideTo(4);
        }
        else {
            console.log("success!");
            this.account = this.account.concat(this.slideOneForm.value).concat(this.slideTwoForm.value).concat(this.slideThreeForm.value).concat(this.slideFourForm.value);
            console.log(this.account);
            this.doSignup();
        }
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
