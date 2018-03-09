import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {SignupPage} from './signup';

import {IonSimpleWizard} from "../../components/ion-simple-wizard-signup/ion-simple-wizard.component";
import {IonSimpleWizardStep} from "../../components/ion-simple-wizard-signup/ion-simple-wizard.step.component";

@NgModule({
    declarations: [
        SignupPage,
        IonSimpleWizard,
        IonSimpleWizardStep,
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
