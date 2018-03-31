import {Component} from '@angular/core';
import {InstantsearchProvider} from '../../providers/instantsearch/instantsearch';
import {connectHits} from 'instantsearch.js/es/connectors';

/**
 * Generated class for the HitsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'hits',
    templateUrl: 'hits.html'
})
export class HitsComponent {

    state: { hits: {}[] } = {hits: []};

    constructor(private instantSearchService: InstantsearchProvider) {
        console.log('Hello HitsComponent Component');
    }

    ngOnInit() {
        // Create a widget which will call `this.updateState` whenever
        // something changes on the search state itself
        const widget = connectHits(this.updateState);

        // Register the Hits widget into the instantSearchService search instance.
        this.instantSearchService.search.addWidget(widget());
    }

    updateState = (state, isFirstRendering) => {
        // asynchronous update of the state
        // avoid `ExpressionChangedAfterItHasBeenCheckedError`
        if (isFirstRendering) {
            return Promise.resolve().then(() => {
                this.state = state;
            });
        }

        this.state = state;
    }
}
