import {Player} from './player';

export class Game {

  private players: Array<Player> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  private popCategory: string = "Pop";
  private scienceCategory: string = "Science";
  private sportsCategory: string = "Sports";
  private rockCategory: string = "Rock"

  private boardSize: number = 12;

  constructor() {
    let categorySize = 50;
    for (let i = 0; i < categorySize; i++) {
      this.popQuestions.push(this.createQuestion(this.popCategory, i));
      this.scienceQuestions.push(this.createQuestion(this.scienceCategory, i));
      this.sportsQuestions.push(this.createQuestion(this.sportsCategory, i));
      this.rockQuestions.push(this.createQuestion(this.rockCategory, i));
    }
  }

  private createQuestion(type: string, index: number): string {
    return type + " Question " + index;
  }

  public addPlayer(name: string): boolean {
    this.players.push(new Player(name));
    console.log(name + " was added");
    console.log("They are player number " + this.howManyPlayers());
    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayer];
  }

  private advanceInBoard(positions: number) {
    let player = this.getCurrentPlayer();
    let newPosition = player.position + positions;


    if (this.currentPlayerReachedEndOfBoard(newPosition)) {
      player.position = newPosition - this.boardSize;
    } else {
      player.position = newPosition;
    }
    console.log(player.name + "'s new location is " + player.position);
  }

  private nextPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.howManyPlayers())
      this.currentPlayer = 0;
  }

  private isOddRoll(roll: number): boolean {
    return roll % 2 != 0;
  }

  private currentPlayerReachedEndOfBoard(position: number): boolean {
    let lastBoardPosition = 11;
    return position > lastBoardPosition;
  }

  // Runs a new turn and determines if a winner has been found or if the game should continue
  public newTurn(roll: number) {
    // Gets the current player
    let player = this.getCurrentPlayer();
    let isCorrectAnswer = false;
    console.log(this.getCurrentPlayer().name + " is the current player");
    console.log("They have rolled a " + roll);

    // If player is in the penalty box and rolls an odd number take them out and advance
    if (player.inPenaltyBox) {
      if (this.isOddRoll(roll)) {
        player.inPenaltyBox = false;
        console.log(player.name + " is getting out of the penalty box");
      }
      else {
        // if the player didn't roll an odd number continue to next round
        console.log(player.name + " is not getting out of the penalty box");
        this.nextPlayer();
        return true;
      }
    }
    this.advanceInBoard(roll);
    this.askQuestion();
    this.processAnswer();

    if (this.didPlayerWin())
      return false;
    else {
      this.nextPlayer();
    }
    return true;
  }

  private askQuestion(): void {
    let category = this.currentCategory();
    console.log("The category is " + this.currentCategory());

    switch (category) {
      case this.popCategory:
        console.log(this.popQuestions.shift());
        break;
      case this.scienceCategory:
        console.log(this.scienceQuestions.shift());
        break;
      case this.sportsCategory:
        console.log(this.sportsQuestions.shift());
        break;
      case this.rockCategory:
        console.log(this.rockQuestions.shift());
        break;
    }
  }

  private processAnswer(): void {
    let wrongAnswerNumber = 7;
    let player = this.getCurrentPlayer();

    // if the random answer equals 7 then it is a wrong answer
    if (Math.floor(Math.random() * 10) == wrongAnswerNumber) {
      player.inPenaltyBox = true;
      console.log('Question was incorrectly answered');
      console.log(player.name + " was sent to the penalty box");
    } else {
      player.incrementPurse();
      console.log('Answer was correct!!!!');
      console.log(player.name + " now has " + player.purse + " Gold Coins.");
    }
  }

  private currentCategory(): string {
    switch (this.getCurrentPlayer().position % 4) {
      case 0:
        return this.popCategory;
        break;
      case 1:
        return this.scienceCategory;
        break;
      case 2:
        return this.sportsCategory;
        break;
      default:
        return this.rockCategory;
        break;
    }
  }

  private didPlayerWin(): boolean {
    return this.getCurrentPlayer().purse == 6
  }
}