import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import instantsearch from 'instantsearch.js/es';

/*
  Generated class for the InstantsearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InstantsearchProvider {
    search = instantsearch({
        appId: 'Q2F9NYKFSS',
        apiKey: 'bf2e29c7c2c70b33fc4d7d6b4435ae39',
        indexName: 'announcement_prod',
        urlSync: true
    });


    constructor(public http: HttpClient) {}

}
