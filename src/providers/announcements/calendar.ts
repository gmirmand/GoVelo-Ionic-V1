import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';

import {Api} from '../api/api';

@Injectable()
export class Calendar {

    constructor(public api: Api) {
    }

    add(infos: any) {
        infos = {
            "picture": infos[0].picture,
        };
        let seq = this.api.post('calendar', infos).share();

        seq.subscribe((res: any) => {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                console.log('OK');
            }
            console.log(res);
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }
}
