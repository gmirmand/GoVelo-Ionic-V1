import {Component, ViewChild} from '@angular/core';
import {
    Events,
    IonicPage,
    LoadingController,
    ModalController,
    NavController,
    NavParams,
    ToastController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NativeGeocoder, NativeGeocoderForwardResult} from "@ionic-native/native-geocoder";
import {Style} from "../../providers/providers";
import {AutocompletePage} from "../../components/autocomplete/autocomplete";

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
    @ViewChild('findSlider')
    findSlider: any;

    find: any = {};

    styles: any;
    loader = this.loadSpinner();

    //Slides forms
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;
    slideFourForm: FormGroup;

    submitAttempt: boolean = false;

    //AutoGeoComplete
    address;
    lat;
    long;
    slideOneData;

    //FromTO
    fromMin;
    fromMinStr;
    fromMax;
    fromMaxStr;
    toMin;
    toMinStr;
    toMax;
    toMaxStr;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public evts: Events,
                public formBuilder: FormBuilder,
                private nativeGeocoder: NativeGeocoder,
                public toastCtrl: ToastController,
                public loadingCtrl: LoadingController,
                public styleProvider: Style,
                private modalCtrl: ModalController) {

        //FromTo
        this.fromMin = new Date();
        this.fromMinStr = this.fromMin.toISOString().substring(0, 10);
        this.fromMax = this.fromMin;
        this.fromMax.setFullYear(this.fromMin.getFullYear() + 2);
        this.fromMaxStr = this.fromMax.toISOString().substring(0, 10);
        this.toMin = this.fromMin;
        this.toMinStr = this.fromMinStr;
        this.toMax = this.fromMax;
        this.toMaxStr = this.fromMaxStr;

        //AutoGeoComplete
        this.address = {
            place: '',
            range: ''
        };
        //Slide1
        this.slideOneForm = formBuilder.group({
            town: ['', Validators.required],
            range: [200]
        });
        //Slide2
        this.slideTwoForm = formBuilder.group({
            type: ['VTT']
        });
        //Slide3
        this.slideThreeForm = formBuilder.group({
            from: undefined,
            to: undefined
        });
        //Slide3
        this.slideFourForm = formBuilder.group({
            price: [{lower: 5, upper: 20}]
        });
    }

//    Get Styles
    getStyles() {
        // Attempt to create in through our Style service
        this.styleProvider.get().subscribe((resp) => {
            this.styles = resp['hydra:member'];
        }, (err) => {
            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: 'Fail to get styles',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            this.navCtrl.parent.select(2);
            return 'Fail to get styles';
        });
    }

//Steps slider signup
    next() {
        this.findSlider.slideNext();
    }

    prev() {
        this.findSlider.slidePrev();
    }

//    FromTo
    fromtoupdate(e) {
        //    Test if max/min values when edit
    }


// AutoGeoComplete
    showAddressModal() {
        const modal = this.modalCtrl.create(AutocompletePage);
        modal.onDidDismiss(data => {
            this.address.place = data;
        });
        modal.present();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FindPage');
        this.getStyles();
    }

//    Save
    save() {
        this.submitAttempt = true;
        if (!this.slideOneForm.valid) {
            this.findSlider.slideTo(0);
        } else if (!this.slideTwoForm.valid) {
            this.findSlider.slideTo(1);
        } else if (!this.slideThreeForm.valid) {
            this.findSlider.slideTo(2);
        } else if (!this.slideFourForm.valid) {
            this.findSlider.slideTo(3);
        } else {
            this.loader.present();
            this.nativeGeocoder.forwardGeocode(this.address)
                .then((coordinates: NativeGeocoderForwardResult) => {
                    this.lat = coordinates[0].latitude,
                        this.long = coordinates[0].longitude
                })
                .catch((error: any) => {
                    console.log(error),
                        this.lat = '45.039932',
                        this.long = '3.880841'
                }).then(() => {
                this.mergeData();
                console.log(this.find);
            });
        }
    }

    mergeData() {
        let lat = {lat: this.lat};
        let long = {long: this.long};
        this.slideOneData = Object.assign(this.slideOneForm.value, lat, long);

        this.find = {
            "address": this.slideOneData,
            "type": this.slideTwoForm.value,
            "fromto": this.slideThreeForm.value,
            "price": this.slideFourForm.value,
        };
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
