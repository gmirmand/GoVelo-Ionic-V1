import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';

import {Api} from '../api/api';

@Injectable()
export class Calendar {

    constructor(public api: Api) {
    }

    add(infos: any) {
        infos = {
            "start": infos.from.format('YYYY-MM-DD'),
            "end": infos.to.format('YYYY-MM-DD')
        };
        let seq = this.api.post('calendars', infos).share();

        seq.subscribe((res: any) => {
            // If the API returned a successful response, calendar have been create
            console.log(res);
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }
}
