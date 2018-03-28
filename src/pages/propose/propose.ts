import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {CalendarComponentOptions} from 'ion2-calendar';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomFile} from "file-input-accessor";
import {AutocompletePage} from '../../components/autocomplete/autocomplete';
import {NativeGeocoder, NativeGeocoderForwardResult} from '@ionic-native/native-geocoder';
import {AnnouncementDetailsPage} from "../pages";

@IonicPage()
@Component({
    selector: 'page-propose',
    templateUrl: 'propose.html',
})
export class ProposePage {
    @ViewChild('proposeSlider') proposeSlider: any;

    propose: any = [];

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
    slideSixForm: FormGroup;
    slideSevenForm: FormGroup;

    submitAttempt: boolean = false;

    disabled: boolean = true;
    type: 'js-date'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
    optionsRange: CalendarComponentOptions = {
        pickMode: 'range'
    };

    constructor(public navCtrl: NavController,
                private modalCtrl: ModalController,
                public navParams: NavParams,
                public evts: Events,
                public formBuilder: FormBuilder,
                private nativeGeocoder: NativeGeocoder) {
        //AutoGeoComplete
        this.address = {
            place: ''
        };

        //Form
        //Slide1
        this.slideOneForm = formBuilder.group({
            title: ['ToRemove',
                Validators.compose([
                    Validators.minLength(5),
                    Validators.maxLength(50),
                    Validators.required]
                )],
            description: ['ToRemove', Validators.required]
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
            town: ['', Validators.required]
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
        this.slideSevenForm = formBuilder.group({
            lock1: [undefined],
            lock2: [undefined],
            lock3: [undefined],
            lock4: [undefined]
        });
    }

    //Steps slider signup
    next() {
        this.proposeSlider.slideNext();
    }

    prev() {
        this.proposeSlider.slidePrev();
    }

    //Global form functions
    save() {
        this.submitAttempt = true;
        // this.propose = this.propose.concat(this.slideOneForm.value).concat(this.slideTwoForm.value).concat(this.slideThreeForm.value);


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
                });
            this.sendData();
            this.navCtrl.setRoot(AnnouncementDetailsPage);
        }
    };

    sendData() {
        //    Check input needed
        //    Slide 1 :
        console.log(this.slideOneForm.value);
        //    Slide 2 :
        console.log(this.slideTwoForm.value);
        //    Slide 3 :
        console.log(this.slideThreeForm.value);
        //    Slide 4 :
        console.log(this.slideFourForm.value, this.lat, this.long);
        //    Slide 5 :
        console.log(this.slideFiveForm.value);
        //    Slide 6 :
        console.log(this.calendar.dateRangeArray);
        //    Slide 7 :
        console.log(this.slideSevenForm.value);
    }

    //Calendar
    onCalendarChange(e) {
        this.disabled = false;
    }

    addCalendar() {
        console.log(this.calendar);
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
        modal.present();
        modal.onDidDismiss(data => {
            this.address.place = data;
        });
    }
}
