import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AnnouncementPage} from './announcement';
import {HitsComponent} from "../../components/hits/hits";

@NgModule({
    declarations: [
        AnnouncementPage,
        HitsComponent
    ],
    imports: [
        IonicPageModule.forChild(AnnouncementPage)
    ],
})
export class AnnouncementPageModule {
}
