import { Observable } from "rxjs";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/startWith";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/sampleTime";


import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/timestamp';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/takeWhile'



import { canvas, ctx } from "./main"
import { StarStream$, paintStars } from "./starfield_1"
import { Enemies$, paintEnemies, gameOver, collision } from "./enemy_1"
// import  { HeroShots, paintHeroShots } from "./hero_shots"

const HERO_Y = canvas.height - 30;
 
const mouseMove = Observable.fromEvent(canvas, 'mousemove');
const SpaceShip$ = mouseMove
    .map(event => ({
        x: event.clientX,
        y: HERO_Y
    }))
    .startWith({
        x: canvas.startWith / 2,
        y: HERO_Y
    })

function drawTriangle(x, y, width, color, direction) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction === 'up' ? y - width : y + width);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x - width, y);
    ctx.fill();
}

function paintSpaceShip(x, y) {
    drawTriangle(x, y, 20, '#ff0000', 'up');
}

function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroShots, actors.enemies);
}

const playerFiring = Observable
    .merge(
        Observable.fromEvent(canvas, 'click'),
        Observable
        .fromEvent(document, 'keydown')
        .filter(evt => evt.code == "Space")
    )
    .startWith({})
    .sampleTime(200)
    .timestamp();

    const HeroShots = Observable
        .combineLatest(playerFiring, SpaceShip$, (
            shotEvents,
            spaceShip
        ) => ({
            timestamp:shotEvents.timestamp,
            x: spaceShip.x
        }))
        .distinct(shot => shot.timestamp)
        .scan(
            (shotArray, shot) => {
                shotArray.push({
                    x: shot.x,
                    y: HERO_Y
                });
                return shotArray;
            },
            []
        );

const SHOOTING_SPEED = 15;

function paintHeroShots(heroShots, enemies) {
    heroShots.forEach((shot, i) => {
        for (let l = 0; l < enemies.length; l++) {
            const enemy = enemies[l];
            if (!enemy.isDead && collision(shot, enemy)) {
                enemy.isDead = true;
                shot.x = shot.y = -100;
                break;
            }
        }
        shot.y -= SHOOTING_SPEED;
        drawTriangle(shot.x, shot.y, 5, "#ffff00", "up");
    });
}



const SPEED = 40;
const Game = Observable.combineLatest(
    StarStream$,
    SpaceShip$,
    Enemies$,
    HeroShots,
    (stars, spaceship, enemies, heroShots) => ({
        stars,
        spaceship,
        enemies,
        heroShots        
    }))
    .sampleTime(SPEED)
    .takeWhile(actors => gameOver(actors.spaceship, actors.enemies) === false)
    .subscribe(renderScene);



export {Game, SpaceShip$ , drawTriangle, HERO_Y}