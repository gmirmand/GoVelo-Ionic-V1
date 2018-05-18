import {NgModule} from '@angular/core';
import {AutocompletePage} from './autocomplete/autocomplete';
import {HitsComponent} from './hits/hits';
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
    declarations: [
        AutocompletePage,
        HitsComponent],
    imports: [PipesModule],
    exports: [
        AutocompletePage,
        HitsComponent]
})
export class ComponentsModule {
}