import {FormControl} from '@angular/forms';
import {User} from "../providers/providers";

export class EmailValidator {
    constructor(
        public user: User) {
    }

    static checkEmail(control: FormControl): any {
        return new Promise(resolve => {/*
            this.user.login(control.value.toLowerCase()).subscribe((resp) => {
                resp['hydra:member'].forEach(function (user) {
                    if (user.email.toLowerCase() == control.value.toLowerCase()) {
                        resolve({
                            "Email taken": true
                        });
                        return;
                    }
                    resolve(null);
                });
            }, (err) => {
            });*/


            setTimeout(() => {
                if (control.value.toLowerCase() === "greg") {

                    resolve({
                        "Email taken": true
                    });

                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }
}