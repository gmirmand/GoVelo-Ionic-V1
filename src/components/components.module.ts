import {NgModule} from '@angular/core';
import {AutocompletePage} from './autocomplete/autocomplete';
import {HitsComponent} from './hits/hits';

@NgModule({
    declarations: [AutocompletePage,
        HitsComponent],
    imports: [],
    exports: [AutocompletePage,
        HitsComponent]
})
export class ComponentsModule {
}