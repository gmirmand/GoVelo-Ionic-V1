import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementDetailsPage } from './announcement-details';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    AnnouncementDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementDetailsPage),
      RoundProgressModule,
  ],
})
export class AnnouncementDetailsPageModule {}
