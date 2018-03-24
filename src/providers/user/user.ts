import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';

import {Api} from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
    _user: any;

    constructor(public api: Api) {
    }

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login(accountInfo: any) {
        accountInfo = {
            "email": accountInfo.email,
            "password": accountInfo.passWord
        };
        let seq = this.api.get('users', accountInfo).share();

        seq.subscribe((res: any) => {
            console.log(res);
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                this._loggedIn(res);
            } else {
            }
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }

    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    signup(accountInfo: any) {
        accountInfo = {
            "email": accountInfo[1].email,
            "username": accountInfo[1].email,
            "enabled": true,
            "plainPassword": accountInfo[1].passWord,
            "firstname": accountInfo[0].firstName,
            "lastname": accountInfo[0].lastName,
            "phone": accountInfo[2].phone,
            "birth": "2018-03-01T11:03:47.845Z"/*accountInfo[2].age*/,
            "picture": accountInfo[3].profilPicture,
            "sexe": parseInt(accountInfo[2].sex)
        };
        let seq = this.api.post('users', accountInfo).share();

        seq.subscribe((res: any) => {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                this._loggedIn(res);
            }
            console.log(res);
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this._user = null;
    }

    /**
     * Process a login/signup response to store user data
     */
    _loggedIn(resp) {
        this._user = resp.user;
    }
}
