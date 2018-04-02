import {NgModule} from '@angular/core';
import {LimitPipe} from './limit/limit';
import {CommonModule} from "@angular/common";
import { RemoveSpacesPipe } from './remove-spaces/remove-spaces';

@NgModule({
    declarations: [LimitPipe,
    RemoveSpacesPipe],
    imports: [CommonModule],
    exports: [LimitPipe,
    RemoveSpacesPipe]
})
export class PipesModule {
}
