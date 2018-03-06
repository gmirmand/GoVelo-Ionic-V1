import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {SignupPage} from './signup';
import {IonSimpleWizard} from "../ion-simple-wizard/ion-simple-wizard.component";
import {IonSimpleWizardStep} from "../ion-simple-wizard/ion-simple-wizard.step.component";

@NgModule({
    declarations: [
        SignupPage,
        IonSimpleWizard,
        IonSimpleWizardStep
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
        TranslateModule.forChild()
    ],
    exports: [
        SignupPage
    ]
})
export class SignupPageModule {
}
