import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FindPage} from './find';

import {IonSimpleWizard} from "../../components/ion-simple-wizard-find/ion-simple-wizard.component";
import {IonSimpleWizardStep} from "../../components/ion-simple-wizard-find/ion-simple-wizard.step.component";

@NgModule({
    declarations: [
        FindPage,
        IonSimpleWizard,
        IonSimpleWizardStep
    ],
    imports: [
        IonicPageModule.forChild(FindPage),
    ],
})
export class FindPageModule {
}
