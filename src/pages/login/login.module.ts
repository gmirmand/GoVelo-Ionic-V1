import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {IonicPageModule} from 'ionic-angular';

import {IonSimpleWizard} from '../ion-simple-wizard/ion-simple-wizard.component';
import {IonSimpleWizardStep} from '../ion-simple-wizard/ion-simple-wizard.step.component';

import {LoginPage} from './login';

@NgModule({
    declarations: [
        LoginPage,
        IonSimpleWizard,
        IonSimpleWizardStep
    ],
    imports: [
        IonicPageModule.forChild(LoginPage),
        TranslateModule.forChild()
    ],
    exports: [
        LoginPage
    ]
})
export class LoginPageModule {
}
