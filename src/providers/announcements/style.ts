import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';

import {Api} from '../api/api';

@Injectable()
export class Style {

    constructor(public api: Api) {
    }

    //get styles
    get() {
        let seq = this.api.get('styles').share();

        seq.subscribe((res: any) => {
            // If the API returned a successful response, mark the user as logged in
            return res;
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }
}
