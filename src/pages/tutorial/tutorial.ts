import {Component, ViewChild} from '@angular/core';
import {IonicPage, MenuController, NavController, Platform} from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';

export interface Slide {
    title: string;
    description: string;
    image: string;
}

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html'
})
export class TutorialPage {
    @ViewChild('tutorialSlider') tutorialSlider: any;
    slides: Slide[];
    showSkip = true;
    dir: string = 'ltr';

    constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
        this.dir = platform.dir();
        translate.get(["TUTORIAL_SLIDE1_TITLE",
            "TUTORIAL_SLIDE1_DESCRIPTION",
            "TUTORIAL_SLIDE2_TITLE",
            "TUTORIAL_SLIDE2_DESCRIPTION",
            "TUTORIAL_SLIDE3_TITLE",
            "TUTORIAL_SLIDE3_DESCRIPTION",
        ]).subscribe(
            (values) => {
                this.slides = [
                    {
                        title: values.TUTORIAL_SLIDE1_TITLE,
                        description: values.TUTORIAL_SLIDE1_DESCRIPTION,
                        image: 'assets/img/logo/logo-sim-blanc.png',
                    },
                    {
                        title: values.TUTORIAL_SLIDE2_TITLE,
                        description: values.TUTORIAL_SLIDE2_DESCRIPTION,
                        image: 'assets/img/icons/velo-blanc.png',
                    },
                    {
                        title: values.TUTORIAL_SLIDE3_TITLE,
                        description: values.TUTORIAL_SLIDE3_DESCRIPTION,
                        image: 'assets/img/icons/loupe-blanc.png',
                    }
                ];
            });
    }


    next() {
        this.tutorialSlider.slideNext();
    }

    startApp() {
        this.navCtrl.setRoot('WelcomePage', {}, {
            animate: true,
            direction: 'forward'
        });
    }

    onSlideChangeStart(slider) {
        this.showSkip = !slider.isEnd();
    }

    ionViewDidEnter() {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    }

    ionViewWillLeave() {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    }

}
