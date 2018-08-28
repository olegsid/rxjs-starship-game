import './style.scss'
import { Observable } from 'rxjs/Observable'
import { AsyncSubject } from 'rxjs/AsyncSubject'
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/delay';

function getProducts(url){
    let subject$;
    return Observable.create(observer$ =>{

        if(!subject$){
            subject$ = new AsyncSubject();
            Observable.ajax(url).subscribe(subject$);
        }

         subject$.subscribe(observer$);
    })


}
const products$ = getProducts('/products.json');
products$.subscribe(
    next => console.log('Result 1:', next.response),
    error => console.log('ERROR', error)
);

setTimeout(() => {
        products$.subscribe(
            next => console.log('Result 2:', next.response),
            error => console.log('ERROR', error)
        );
    },
    5000
);