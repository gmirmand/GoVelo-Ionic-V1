import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the LimitPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'limit',
})
export class LimitPipe implements PipeTransform {
    /**
     * Takes a value return x first letter
     */
    transform(value: string, length: number): string {

        return value.charAt(length - 1);
    }
}
