import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicProfilPage } from './public-profil';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    PublicProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicProfilPage),
      RoundProgressModule,
  ],
})
export class PublicProfilPageModule {}
