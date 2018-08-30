import { Observable } from "rxjs";
import "rxjs/add/observable/interval"
import "rxjs/add/operator/scan"
import { drawTriangle } from "./hero_1"
import { canvas } from "./main"

const ENEMY_FREQ = 1500;
const ENEMY_SHOOTING_FREQ = 750;
const SHOOTING_SPEED = 15;
const Enemies$ = Observable.interval(ENEMY_FREQ).scan(enemyArray => {
    const enemy = {
        x: parseInt(Math.random() * canvas.width),
        y: -30,
        shots: []
    };
    Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(() => {
        enemy.shots.push({
            x: enemy.x,
            y: enemy.y
        });
        enemy.shots = enemy.shots.filter(isVisible);
    });
    enemyArray.push(enemy);
    return enemyArray
        .filter(isVisible)
        .filter(enemy => !(enemy.isDead && enemy.shots.length === 0));
}, []);


function isVisible(obj) {
    return obj.x > -40 &&
        obj.x < canvas.width + 40 &&
        obj.y > -40 &&
        obj.y < canvas.height + 40;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function paintEnemies(enemies) {
    enemies.forEach(enemy => {
        enemy.y += 5;
        enemy.x += getRandomInt(-15, 15);
        if (!enemy.isDead) {
            drawTriangle(enemy.x, enemy.y, 20, "#00ff00", "down");
        }
        enemy.shots.forEach(shot => {
            shot.y += SHOOTING_SPEED;
            drawTriangle(shot.x, shot.y, 10, "#00ffff", "down");
        });
    });
}


function gameOver(ship, enemies) {
    return enemies.some(enemy => {
        if (collision(ship, enemy)) {
            return true;
        }
        return enemy.shots.some(shot => collision(ship, shot));
    });
}
 function collision(target1, target2) {
     return (
         target1.x > target2.x - 20 &&
         target1.x < target2.x + 20 &&
         target1.y > target2.y - 20 && 
         target1.y < target2.y + 20
     );
 }


export { Enemies$, paintEnemies, paintHeroShots, gameOver, collision  }
