import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Camera} from '@ionic-native/camera';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {BrowserModule} from '@angular/platform-browser';

import {Items} from '../mocks/providers/items';
import {User, Api, Settings, Announcements, Calendar, Style} from '../providers/providers';
import {MyApp} from './app.component';

import {AutocompletePage} from '../components/autocomplete/autocomplete';
import {InstantsearchProvider} from '../providers/instantsearch/instantsearch';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {PipesModule} from "../pipes/pipes.module";

registerLocaleData(localeFr, 'fr');

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new Settings(storage, {
        option1: true,
        option2: 'Ionitron J. Framework',
        option3: '3',
        option4: 'Hello'
    });
}


@NgModule({
    declarations: [
        MyApp,
        AutocompletePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(MyApp, {
            preloadModules: true
        }),
        IonicStorageModule.forRoot(),
        BrowserAnimationsModule,
        PipesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AutocompletePage
    ],
    providers: [
        Api,
        Items,
        User,
        Announcements,
        Calendar,
        Style,
        Camera,
        SplashScreen,
        StatusBar,
        {provide: Settings, useFactory: provideSettings, deps: [Storage]},
        // Keep this to enable Ionic's runtime error handling during development
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        NativeGeocoder,
        InstantsearchProvider
    ]
})
export class AppModule {
}
