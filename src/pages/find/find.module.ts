import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';
import {FindPage} from './find';
import {FileInputAccessorModule} from "file-input-accessor";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        FindPage
    ],
    imports: [
        IonicPageModule.forChild(FindPage),
        TranslateModule.forChild(),
        FileInputAccessorModule,
        CommonModule
    ],
})
export class FindPageModule {
}
