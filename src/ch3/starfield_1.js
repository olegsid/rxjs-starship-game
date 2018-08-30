import { Observable } from "rxjs";
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toArray'
import 'rxjs/add/operator/mergeMap'

import { canvas, ctx } from './main.js'

const SPEED = 40;
const STAR_NUMBER = 250;


const StarStream$ = Observable
    .range(1, STAR_NUMBER)
    .map(() => ({
        x: parseInt(Math.random() * canvas.width, 10),
        y: parseInt(Math.random() * canvas.height, 10),
        size: Math.random() * 10 + 1
    }))
    .toArray()
    .flatMap(starArray => Observable.interval(SPEED).map(() => {
        starArray.forEach(star => {
            if (star.y >= canvas.height) {
                star.y = 0;
            }
            star.y += star.size;
        })

        return starArray;
    }))

function paintStars(stars) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });
}

export { StarStream$, paintStars}