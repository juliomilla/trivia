import {Game} from './game';

export class GameRunner {
    public static main(): void {
        const game = new Game();
        game.addPlayer("Chet");
        game.addPlayer("Pat");
        game.addPlayer("Sue");

        let notAWinner;
        let wrongAnswer = 7;

        do {
            console.log("------------");
            let gameDice = Math.floor(Math.random() * 6) + 1;
            game.roll(gameDice);
        
            if (Math.floor(Math.random() * 10) == wrongAnswer) {
                notAWinner = game.wrongAnswer();
            } else {
                notAWinner = game.wasCorrectlyAnswered();
            }
        
        } while (notAWinner);
    }
}

GameRunner.main();

  