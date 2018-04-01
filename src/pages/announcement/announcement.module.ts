import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AnnouncementPage} from './announcement';
import {HitsComponent} from "../../components/hits/hits";
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        AnnouncementPage,
        HitsComponent
    ],
    imports: [
        IonicPageModule.forChild(AnnouncementPage),
        PipesModule
    ],
})
export class AnnouncementPageModule {
}
