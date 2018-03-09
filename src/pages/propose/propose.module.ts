import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';
import {ProposePage} from './propose';
import { CalendarModule } from "ion2-calendar";
import { CommonModule } from '@angular/common';

import {IonSimpleWizard} from "../../components/ion-simple-wizard-propose/ion-simple-wizard.component";
import {IonSimpleWizardStep} from "../../components/ion-simple-wizard-propose/ion-simple-wizard.step.component";

@NgModule({
    declarations: [
        ProposePage,
        IonSimpleWizard,
        IonSimpleWizardStep
    ],
    imports: [
        CalendarModule,
        IonicPageModule.forChild(ProposePage),
        TranslateModule.forChild(),
        CommonModule
    ],
})
export class ProposePageModule {
}
