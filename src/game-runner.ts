import {Game} from './game';

export class GameRunner {
  public static main(): void {
    const game = new Game();
    game.addPlayer("Chet");
    game.addPlayer("Pat");
    game.addPlayer("Sue");

    var dice = Math.floor(Math.random() * 6) + 1;
    do {
      console.log("*******************")
      dice = Math.floor(Math.random() * 6) + 1;
    } while (game.newTurn(dice));
  }
}

GameRunner.main();

  