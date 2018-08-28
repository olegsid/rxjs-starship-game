import './style.scss'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

const subject$ = new Subject();
const source$ = Observable
    .interval(300)
    .map(v => `Interval message #${v}`)
    .take(5);
source$.subscribe(subject$);
subject$.subscribe(
    next => console.log(`Next: ${next}`),
    error => console.log(`Error: ${error.message}`),
    () => console.log('Completed!')
);
subject$.next('Our message #1');
subject$.next('Our message #2');
setTimeout(subject$.complete, 1000)