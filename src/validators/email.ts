import {FormControl} from '@angular/forms';

export class EmailValidator {

    static checkEmail(control: FormControl): any {

        return new Promise(resolve => {

            //Fake a slow response from server

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