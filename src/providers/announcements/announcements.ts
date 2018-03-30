import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';

import {Api} from '../api/api';

@Injectable()
export class Announcements {

    constructor(public api: Api) {
    }

    add(announcement: any) {
        let lock = "";
        let calendar;
        if (announcement.security.lock1 && announcement.security.lock2
            && announcement.security.lock3 && announcement.security.lock4) {
            lock = announcement.security.lock1.toString() +
                announcement.security.lock2.toString() +
                announcement.security.lock3.toString() +
                announcement.security.lock4.toString();
        }

        console.log('LOG1', announcement.calendarsId['calendarsId']);
        announcement.calendarsId.forEach(function (id) {
            console.log('push');
            calendar.push(
                {
                    "@id": "/api/calendars/" + id + "",
                    "id": id
                })
        });
        console.log('LOG2', announcement.calendarsId);

        announcement = {
            "picture": announcement.pictures.picture,
            "description": announcement.infos.description,
            "title": announcement.infos.title,
            "priceD": announcement.price.price,
            "longitude": announcement.address.long,
            "latitude": announcement.address.lat,
            "adress": announcement.address.town,
            "lockCode": lock,
            "author": {
                "@id": "/api/users/1",
                "id": 1
            },
            "calendar": calendar,
            "style": [
                {
                    "@id": "/api/styles/" + announcement.type.type + "",
                    "id": announcement.type.type
                }
            ]
        };
        console.log(announcement);
        let seq = this.api.post('announcements', announcement).share();

        seq.subscribe((res: any) => {
            return res;
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }
}
