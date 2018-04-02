import {Component, ViewChild} from '@angular/core';
import {
    Events,
    IonicPage,
    NavController,
    NavParams,
    ModalController,
    ToastController,
    LoadingController
} from 'ionic-angular';
import {CalendarComponentOptions} from 'ion2-calendar';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomFile} from "file-input-accessor";
import {AutocompletePage} from '../../components/autocomplete/autocomplete';
import {NativeGeocoder, NativeGeocoderForwardResult} from '@ionic-native/native-geocoder';
//Api providers
import {Announcements} from '../../providers/providers';
import {Style} from '../../providers/providers';
import {Calendar} from '../../providers/providers';
import {AnnouncementDetailsPage} from "../pages";


@IonicPage()
@Component({
    selector: 'page-propose',
    templateUrl: 'propose.html',
})
export class ProposePage {
    @ViewChild('proposeSlider')
    proposeSlider: any;

    hide: boolean = true;

    propose: any = {};
    styles: any;

    //PP file imgfileList;
    fileList: ICustomFile[] = [];

    allowedFileTypes = '(gif|jpe?g|jpeg|tiff|png)';
    allowedFileExt = '(.(gif|jpe?g|jpeg|tiff|png)$)';
    withMeta = true;
    size = 1000000;

    //AutoGeoComplete
    address;
    lat;
    long;

    //Calendar
    calendar: {
        dateRangeArray: any[],
        dateRange: {
            from: string,
            to: string
        }
    } = {
        dateRange: undefined,
        dateRangeArray: []
    };
    pushedCalendars = [];

    //Slides forms
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;
    slideFourForm: FormGroup;
    slideFiveForm: FormGroup;
    slideFiveData: object;
    slideSixForm: FormGroup;
    slideSixData: object;
    slideSevenForm: FormGroup;

    submitAttempt: boolean = false;

    disabled: boolean = true;
    type: 'js-date'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
    optionsRange: CalendarComponentOptions = {
        pickMode: 'range',
        color: 'secondary',
        weekdays: ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'],
        weekStart: 1
    };

    constructor(public navCtrl: NavController,
                private modalCtrl: ModalController,
                public navParams: NavParams,
                public evts: Events,
                public formBuilder: FormBuilder,
                private nativeGeocoder: NativeGeocoder,
                public toastCtrl: ToastController,
                public announcementProvider: Announcements,
                public styleProvider: Style,
                public calendarProvider: Calendar,
                public loadingCtrl: LoadingController) {
        //AutoGeoComplete
        this.address = {
            place: '',
            town: ''
        };

        //Form
        //Slide1
        this.slideOneForm = formBuilder.group({
            title: ['',
                Validators.compose([
                    Validators.minLength(5),
                    Validators.maxLength(50),
                    Validators.required]
                )],
            description: ['', Validators.required]
        });
        //Slide2
        this.slideTwoForm = formBuilder.group({
            file: ['']
        });
        //Slide3
        this.slideThreeForm = formBuilder.group({
            type: ['VTT']
        });
        //Slide4
        this.slideFourForm = formBuilder.group({
            address: ['', Validators.required]
        });
        //Slide5
        this.slideFiveForm = formBuilder.group({
            price: [5, Validators.compose([
                Validators.required,
                Validators.min(3),
                Validators.max(25),
            ])]
        });
        //Slide6
        this.slideSixForm = formBuilder.group({
            calendar: ['', Validators.required]
        });
        //Slide7
        this
            .slideSevenForm = formBuilder.group({
            lock1: undefined,
            lock2: undefined,
            lock3: undefined,
            lock4: undefined
        });
    }

//    Get Styles
    getStyles() {
        // Attempt to create in through our Style service
        let loader = this.loadSpinner();
        loader.present().then(() => this.styleProvider.get().subscribe((resp) => {
            this.styles = resp['hydra:member'];
            loader.dismiss();
        }, (err) => {
            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: 'Oups, une erreur est survenue ... veuillez contacter le support (g#tSt#l#s)',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            this.navCtrl.parent.select(2);
            loader.dismiss();
            return 'Fail to get styles';
        }));
    }

//Steps slider signup
    next() {
        this.proposeSlider.slideNext();
    }

    prev() {
        this.proposeSlider.slidePrev();
    }

    slideChanged() {
        let currentIndex = this.proposeSlider.getActiveIndex();
        this.hide = currentIndex === 0;
    }

//Calendar
    onCalendarChange(e) {
        this.disabled = false;
    }

    addCalendar() {
        if (this.calendar.dateRange.from) {
            this.disabled = true;
            if (!this.calendar.dateRange.to)
                this.calendar.dateRange.to = this.calendar.dateRange.from;
            this.calendar.dateRangeArray.push(this.calendar.dateRange);
        }
    }

    delete(index) {
        this.calendar.dateRangeArray.splice(index, 1);
    }

//View global
    ionViewDidLoad() {
        console.log('ionViewDidLoad ProposePage');
    }

    ionViewDidEnter() {
        //Slides forms
        this.getStyles();
        this.FileUploadWatcher();
    }

//File
    FileUploadWatcher() {
        this.slideTwoForm.get('file').valueChanges
            .subscribe((val) => {
                let errors = Object.keys(val[0].errors);
                if (errors.length === 0) {
                    this.fileList = this.fileList ? this.fileList.concat(val[0]) : [];
                }
            });
    }

    removeFile(index) {
        this.fileList.splice(index, 1);
    }

// AutoGeoComplete
    showAddressModal() {
        const modal = this.modalCtrl.create(AutocompletePage);
        modal.onDidDismiss(data => {
            if (data) {
                this.address.place = data.description;
                if (data.terms.length > 2) {
                    this.address.town = data.terms[data.terms.length - 2].value += ',' + data.terms[data.terms.length - 3].value;
                } else {
                    this.address.town = data.terms[data.terms.length - 2].value;
                }
            }
        });
        modal.present();
    }

//Global form functions
    save() {
        let loader = this.loadSpinner();
        this.submitAttempt = true;
        if (!this.slideOneForm.valid) {
            this.proposeSlider.slideTo(1);
        }
        else if (!this.slideTwoForm.valid) {
            this.proposeSlider.slideTo(2);
        }
        else if (!this.slideThreeForm.valid) {
            this.proposeSlider.slideTo(3);
        }
        else if (!this.slideFourForm.valid) {
            this.proposeSlider.slideTo(4);
        }
        else if (!this.slideFiveForm.valid) {
            this.proposeSlider.slideTo(5);
        }
        else if (this.calendar.dateRangeArray.length === 0) {
            this.proposeSlider.slideTo(6);
        }
        else if (!this.slideSevenForm.valid) {
            this.proposeSlider.slideTo(7);
        }
        else {
            loader.present().then(() => this.nativeGeocoder.forwardGeocode(this.address)
                .then((coordinates: NativeGeocoderForwardResult) => {
                    this.lat = coordinates[0].latitude;
                    this.long = coordinates[0].longitude;
                    loader.dismiss();
                })
                .catch((error: any) => {
                    console.log(error);
                    this.lat = '45.039932';
                    this.long = '3.880841';
                    loader.dismiss();
                }).then(() => {
                    this.mergeData();
                    this.createCalendar();
                }));
        }
    };

//    Calendar push
    createCalendar() {
        // Attempt to create a calendar item in through our User service
        let self = this;
        this.propose.calendars.calendar.forEach(function (slot) {
            self.createUniqueSlot(slot);
        });
    }

    createUniqueSlot(slot) {
        let loader = this.loadSpinner();
        loader.present().then(() => this.calendarProvider.add(slot).subscribe((resp) => {
            this.pushedCalendars.push(resp['id']);
            if (this.pushedCalendars.length === this.propose.calendars.calendar.length) {
                this.pushAnnouncement(this.pushedCalendars);
            }
            loader.dismiss();
        }, (err) => {
            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: 'Error Calendar',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            loader.dismiss();
        }));
    }


//Signup
    mergeData() {
        let lat = {lat: this.lat};
        let long = {long: this.long};
        let town = {town: this.address.town};
        this.slideFiveData = Object.assign(this.slideFourForm.value, town, lat, long);

        let calendar = {calendar: this.calendar.dateRangeArray};
        this.slideSixData = Object.assign(calendar);

        this.propose = {
            "infos": this.slideOneForm.value,
            "pictures": this.fileList,
            "type": this.slideThreeForm.value,
            "address": this.slideFiveData,
            "price": this.slideFiveForm.value,
            "calendars": this.slideSixData,
            "security": this.slideSevenForm.value
        };
    }

    pushAnnouncement(calendarsId) {
        // Attempt to create in through our Items service
        let loader = this.loadSpinner();
        this.propose = Object.assign(this.propose, {'calendarsId': calendarsId});
        loader.present().then(() => this.announcementProvider.add(this.propose).subscribe((resp) => {
            let toast = this.toastCtrl.create({
                message: 'Annonce créé !',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            this.navCtrl.push(AnnouncementDetailsPage);
            loader.dismiss();
        }, (err) => {
            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: 'error',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            loader.dismiss();
        }));
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