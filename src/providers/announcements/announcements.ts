import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';

import {Api} from '../api/api';
import {Storage} from '@ionic/storage';

@Injectable()
export class Announcements {

    constructor(public api: Api,
                private storage: Storage) {
    }

    add(announcement: any) {
        let lock, picture = "";
        let calendar = [];
        if (announcement.security.lock1 && announcement.security.lock2
            && announcement.security.lock3 && announcement.security.lock4) {
            lock = announcement.security.lock1.toString() +
                announcement.security.lock2.toString() +
                announcement.security.lock3.toString() +
                announcement.security.lock4.toString();
        }
        announcement.calendarsId.forEach(function (id) {
            calendar.push({
                "@id": "/api/calendars/" + id + "",
                "id": id
            })
        });
        let id: number;
        this.storage.get('age').then((val) => {
            id = val;
        });

        announcement.pictures.forEach(function (img) {
            picture += img.imgSrc += '&';
        });
        console.log(announcement);
        announcement = {
            "picture": picture,
            "description": announcement.infos.description,
            "title": announcement.infos.title,
            "priceD": parseInt(announcement.price.price),
            "longitude": announcement.address.long,
            "latitude": announcement.address.lat,
            "adress": announcement.address.address,
            "city": announcement.address.town,
            "lockCode": lock,
            "author": {
                "@id": "/api/users/2",
                "id": 2
            },
            "calendar": calendar,
            "style": [{
                "@id": "/api/styles/" + announcement.type.type + "",
                "id": announcement.type.type
            }]
        };


        let seq = this.api.post('announcements', announcement).share();
        seq.subscribe((res: any) => {
        }, err => {
            console.error('ERROR', err);
        });
        return seq;
    }
}
