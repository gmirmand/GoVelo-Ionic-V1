import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the RemoveSpacesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'removeSpaces',
})
export class RemoveSpacesPipe implements PipeTransform {
    /**
     * Takes a value and remove spaces
     */
    transform(value) {
        return value.replace(/ /g, "").toLowerCase();
    }
}
