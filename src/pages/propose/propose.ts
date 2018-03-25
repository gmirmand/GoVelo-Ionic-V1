import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {CalendarComponentOptions} from 'ion2-calendar';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomFile} from "file-input-accessor";
import {AutocompletePage} from '../../components/autocomplete/autocomplete';

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
    maxWidth = 1500;
    maxHeight = 1500;

    //AutoGeoComplete
    address;

    //Slides forms
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;
    slideFourForm: FormGroup;
    slideFiveForm: FormGroup;
    slideSixForm: FormGroup;
    slideSevenForm: FormGroup;
    slideEightForm: FormGroup;
    slideNineForm: FormGroup;


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
                public formBuilder: FormBuilder) {
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
            town: ['']
        });
    }

    //Steps slider signup
    next() {
        this.proposeSlider.slideNext();
    }

    prev() {
        this.proposeSlider.slidePrev();
    }

    //add Calendar
    addCalendar() {
        if (this.propose.dateRange.from) {
            this.disabled = true;
            if (!this.propose.dateRange.to)
                this.propose.dateRange.to = this.propose.dateRange.from;
            this.propose.dateRangeArray.push(this.propose.dateRange);
        }
    }

    delete(index) {
        this.propose.dateRangeArray.splice(index, 1);
    }


    //Global form functions
    save() {
        this.submitAttempt = true;
        this.propose = this.propose.concat(this.slideOneForm.value).concat(this.slideTwoForm.value).concat(this.slideThreeForm.value);
        console.log(this.propose, this.address);
    };

    proposeForm() {
        console.log('test');
        this.navCtrl.parent.select(3);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProposePage');
    }

    ngOnInit() {
        this.slideTwoForm.get('file').valueChanges
            .subscribe((val) => {
                console.log('%c-----FILE LIST CHANGED-----', 'background-color: #008351; color: #fff');
                this.fileList = this.fileList ? this.fileList.concat(val) : [];
            });

    }

    removeFile(index) {
        this.fileList.splice(index, 1);
    }

//    AutoGeoComplete
    showAddressModal() {
        let modal = this.modalCtrl.create(AutocompletePage);
        modal.onDidDismiss(data => {
            console.log(this.address);
            this.address.place = data;
        });
        modal.present();
    }
}
