import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilPage } from './profil';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    ProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilPage),
      RoundProgressModule,
  ],
})
export class ProfilPageModule {}
