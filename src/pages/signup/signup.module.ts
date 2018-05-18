import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';
import {FileInputAccessorModule} from "file-input-accessor";

import {SignupPage} from './signup';

@NgModule({
    declarations: [
        SignupPage
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
        TranslateModule.forChild(),
        FileInputAccessorModule
    ],
    exports: [
        SignupPage
    ]
})
export class SignupPageModule {
}
