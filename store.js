import { BehaviorSubject, Subject } from "rxjs";
import { distinctUntilChanged, pluck, scan } from 'rxjs/operators';

export class Store {
    constructor(initialState) {
        this._store = new BehaviorSubject(
            initialState
        );

        this._stateUpdates = new Subject();

        // Brodcast state updates
        this._stateUpdates.pipe(
            scan((accumulator, currentValue) => {
                return { ...accumulator, ...currentValue };
            }, initialState)
        ).subscribe(this._store);
    }

    // Helpers
    updateState(stateUpdate) {
        this._stateUpdates.next(stateUpdate);
    }

    selectState(stateKey) {
        return this._store.pipe(
            distinctUntilChanged(stateKey),
            pluck(stateKey)
        )
    }

    getState() {
        return this._store.asObservable();
    }
}