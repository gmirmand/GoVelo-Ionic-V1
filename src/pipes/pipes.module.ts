import {NgModule} from '@angular/core';
import {LimitPipe} from './limit/limit';
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [LimitPipe],
    imports: [CommonModule],
    exports: [LimitPipe]
})
export class PipesModule {
}
