import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProposePage} from './propose';

import {IonSimpleWizard} from "../ion-simple-wizard/ion-simple-wizard.component";
import {IonSimpleWizardStep} from "../ion-simple-wizard/ion-simple-wizard.step.component";

@NgModule({
    declarations: [
        ProposePage,
        IonSimpleWizard,
        IonSimpleWizardStep
    ],
    imports: [
        IonicPageModule.forChild(ProposePage),
    ],
})
export class ProposePageModule {
}
