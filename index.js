import { Store } from './store';


const store = new Store({
    product: 'Coros Apex 46',
    price: 350,
    available: false
});

// State will emit 'Coros Apex 46'
store.selectState('product').subscribe(console.log);

// State will emit 'Garmin Forerunner'
store.updateState({
    product: 'Garmin Forerunner'
});

// State will not emit nothing
store.updateState({
    available: true
});