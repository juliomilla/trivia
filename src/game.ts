import {Player} from './player';

/**
 * Game class
 */
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

  /**
  * Retrieves the size of the board
  * @returns  Size of the board
  */
  get getBoardSize(): number {
    return this.boardSize;
  }

  /**
  * Adds questions to the game
  * @param type   Type of the question
  * @param index  Number of the question
  * @returns      A string with the question type and number  
  */
  private createQuestion(type: string, index: number): string {
    return type + " Question " + index;
  }

  /**
  * Adds a player to the game
  * @param name   Name of the player
  */
  public addPlayer(name: string) {
    this.players.push(new Player(name));
    console.log(name + " was added");
    console.log("They are player number " + this.howManyPlayers());
  }

  /**
  * Calculates the amount of players in the current game
  * @returns   Number of players in the game
  */
  public howManyPlayers(): number {
    return this.players.length;
  }

  /**
  * Fetches the current player
  * @returns   Current player
  */
  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayer];
  }

  /**
  * Moves the player to a new position
  * @param positions  Number of positions to move
  */
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

  /**
  * Sets the next player to play the next turn
  */
  private nextPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.howManyPlayers())
      this.currentPlayer = 0;
  }

  /**
  * Checks if a roll is an odd number
  * @param roll   Random roll number
  * @returns       If the number is an odd number
  */
  private isOddRoll(roll: number): boolean {
    return roll % 2 != 0;
  }

  /**
  * Checks if a users position has reached the end of the board
  * @param position   Position number
  * @returns           If the user has reached the end of the board
  */
  private currentPlayerReachedEndOfBoard(position: number): boolean {
    let lastBoardPosition = 11;
    return position > lastBoardPosition;
  }

  /**
  * Plays a new turn and determines if the game should continue
  * @param roll   Random roll number
  * @returns       If the game should continue
  */
  public newTurn(roll: number): boolean {
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

    if (this.didGameFinish())
      return false;
    else {
      this.nextPlayer();
    }
    return true;
  }

  /**
  * Poses a question of the appropriate category
  */
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

  /**
  * Processes an answer. If the user rolls 7 it means that the answer was wrong
  */
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

  /**
  * Retrieves the current category based on a users position
  * @returns  Current category
  */
  public currentCategory(): string {
    switch (this.getCurrentPlayer().position % 4) {
      case 0:
        return this.popCategory;
      case 1:
        return this.scienceCategory;
      case 2:
        return this.sportsCategory;
      default:
        return this.rockCategory;
    }
  }

  /**
  * Checks if the player has reached 6 coins and the game has finished
  * @returns  If the game has finished
  */
  public didGameFinish(): boolean {
    return this.getCurrentPlayer().purse == 6
  }
}