import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ModalController, ToastController} from 'ionic-angular';
import {CalendarComponentOptions} from 'ion2-calendar';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomFile} from "file-input-accessor";
import {AutocompletePage} from '../../components/autocomplete/autocomplete';
import {NativeGeocoder, NativeGeocoderForwardResult} from '@ionic-native/native-geocoder';
import {AnnouncementDetailsPage, MainPage} from "../pages";

//Api providers
import {Announcements} from '../../providers/providers';
import {Style} from '../../providers/providers';
import {Calendar} from '../../providers/providers';


@IonicPage()
@Component({
    selector: 'page-propose',
    templateUrl: 'propose.html',
})
export class ProposePage {
    @ViewChild('proposeSlider') proposeSlider: any;

    propose: any = [];
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

    //Slides forms
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;
    slideFourForm: FormGroup;
    slideFiveForm: FormGroup;
    slideFiveData: object;
    slideSixForm: FormGroup;
    slideSevenForm: FormGroup;
    slideSixData: object;

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
                public calendarProvider: Calendar) {
        //AutoGeoComplete
        this
            .address = {
            place: ''
        };

        //Form
        //Slide1
        this
            .slideOneForm = formBuilder.group({
            title: ['ToRemove',
                Validators.compose([
                    Validators.minLength(5),
                    Validators.maxLength(50),
                    Validators.required]
                )],
            description: ['ToRemove', Validators.required]
        });
        //Slide2
        this
            .slideTwoForm = formBuilder.group({
            file: ['']
        });
        //Slide3
        this
            .slideThreeForm = formBuilder.group({
            type: ['VTT']
        });
        //Slide4
        this
            .slideFourForm = formBuilder.group({
            town: ['', Validators.required]
        });
        //Slide5
        this
            .slideFiveForm = formBuilder.group({
            price: [5, Validators.compose([
                Validators.required,
                Validators.min(3),
                Validators.max(25),
            ])]
        });
        //Slide6
        this
            .slideSixForm = formBuilder.group({
            calendar: ['', Validators.required]
        });
        //Slide7
        this
            .slideSevenForm = formBuilder.group({
            lock1: [undefined],
            lock2: [undefined],
            lock3: [undefined],
            lock4: [undefined]
        });
        this.getStyles();
    }

//    Get Styles
    getStyles() {
        // Attempt to create in through our Style service
        this.styleProvider.get().subscribe((resp) => {
            this.styles = resp['hydra:member'];
            console.log(this.styles);
        }, (err) => {
            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: 'error',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            return 'error';
        });
    }

//Steps slider signup
    next() {
        this.proposeSlider.slideNext();
    }

    prev() {
        this.proposeSlider.slidePrev();
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

    createCalendar() {
        // Attempt to create a calendar item in through our User service
        let self = this;
        this.propose[5].calendar.forEach(function (slot) {
            self.createUniqueSlot(slot);
        });
    }

    createUniqueSlot(slot) {
        this.calendarProvider.add(slot).subscribe((resp) => {
            console.log(resp);
        }, (err) => {
            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: 'Error Calendar',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    }

    delete(index) {
        this.calendar.dateRangeArray.splice(index, 1);
    }

//Form global
    proposeForm() {
        this.navCtrl.parent.select(3);
    }

//View global
    ionViewDidLoad() {
        console.log('ionViewDidLoad ProposePage');
    }

    ngOnInit() {
        this.FileUploadWatcher();
    }

//File
    FileUploadWatcher() {
        this.slideTwoForm.get('file').valueChanges
            .subscribe((val) => {
                console.log('%c-----FILE LIST CHANGED-----', 'background-color: #008351; color: #fff');
                let errors = Object.keys(val[0].errors);
                if (errors.length === 0) {
                    this.fileList = this.fileList ? this.fileList.concat(val[0]) : [];
                    console.log(this.fileList);
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
            this.address.place = data;
        });
        modal.present();
    }

//Global form functions
    save() {
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
                this.createCalendar();
                this.pushAnnouncement();
            });
        }
    }
    ;


//Signup
    pushAnnouncement() {
        // Attempt to create in through our Items service
        this.announcementProvider.add(this.propose).subscribe((resp) => {
            this.navCtrl.push(AnnouncementDetailsPage);
        }, (err) => {
            this.navCtrl.push(AnnouncementDetailsPage);

            // Unable to sign up
            let toast = this.toastCtrl.create({
                message: 'error',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    }

    mergeData() {
        //    Check input needed
        //    Slide 1 :
        // console.log(this.slideOneForm.value);
        //    Slide 2 :
        // console.log(this.slideTwoForm.value);
        //    Slide 3 :
        // console.log(this.slideThreeForm.value);
        //    Slide 4 :
        let lat = {lat: this.lat};
        let long = {long: this.long};
        this.slideFiveData = Object.assign(this.slideFourForm.value, lat, long);
        // console.log(this.slideFiveData);
        //    Slide 5 :
        // console.log(this.slideFiveForm.value);
        //    Slide 6 :
        let calendar = {calendar: this.calendar.dateRangeArray};
        this.slideSixData = Object.assign(calendar);
        // console.log(this.slideSixData);
        //    Slide 7 :
        // console.log(this.slideSevenForm.value);

        this.propose = this.propose.concat(
            this.slideOneForm.value,
            this.slideTwoForm.value,
            this.slideThreeForm.value,
            this.slideFiveData,
            this.slideFiveForm.value,
            this.slideSixData,
            this.slideSevenForm.value
        )
        console.log(this.propose);
        // console.log(this.propose[5].calendar[0].from.format('YYYY-MM-DD'));
    }
}
