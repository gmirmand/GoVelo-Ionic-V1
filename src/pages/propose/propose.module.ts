import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';
import {ProposePage} from './propose';

import {IonSimpleWizard} from "../../components/ion-simple-wizard-propose/ion-simple-wizard.component";
import {IonSimpleWizardStep} from "../../components/ion-simple-wizard-propose/ion-simple-wizard.step.component";

@NgModule({
    declarations: [
        ProposePage,
        IonSimpleWizard,
        IonSimpleWizardStep
    ],
    imports: [
        IonicPageModule.forChild(ProposePage),
        TranslateModule.forChild()
    ],
})
export class ProposePageModule {
}
