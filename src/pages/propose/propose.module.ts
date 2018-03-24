import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';
import {ProposePage} from './propose';
import {CalendarModule} from "ion2-calendar";
import {CommonModule} from '@angular/common';
import {FileInputAccessorModule} from "file-input-accessor";

@NgModule({
    declarations: [
        ProposePage
    ],
    imports: [
        CalendarModule,
        IonicPageModule.forChild(ProposePage),
        TranslateModule.forChild(),
        CommonModule,
        FileInputAccessorModule
    ],
})
export class ProposePageModule {
}
