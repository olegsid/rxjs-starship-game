// import { canvas } from "./main";
// import { Observable } from "rxjs";
// import { SpaceShip$, HERO_Y, drawTriangle } from "./hero_1"


// import 'rxjs/add/operator/merge';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/sampleTime';
// import 'rxjs/add/operator/filter'
// import 'rxjs/add/observable/merge'
// import 'rxjs/add/operator/timestamp'
// import 'rxjs/add/observable/fromEvent'



// const playerFiring = Observable
//     .merge(
//         Observable.fromEvent(canvas, 'click'),
//         Observable
//         .fromEvent(document, 'keydown')
//         .filter(evt => evt.keycode === 32)
//     )
//     .startWith({})
//     .sampleTime(200)
//     .timestamp();

//     const HeroShots = Observable
//         .combineLatest(playerFiring, SpaceShip$, (
//             shotEvents,
//             spaceShip
//         ) => ({
//             x: spaceShip.x
//         }))
//         .scan(
//             (shotArray, shot) => {
//                 shotArray.push({
//                     x: shot.x,
//                     y: HERO_Y
//                 });
//                 return shotArray;
//             },
//             []
//         );

// const SHOOTING_SPEED = 15;

// function paintHeroShots(heroShots) {
//     heroShots.forEach(shot => {
//         shot.y -= SHOOTING_SPEED;
//         drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
//     });
// }

// export { HeroShots, paintHeroShots }