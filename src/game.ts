import {Player} from './player';

export class Game {

  private players: Array<Player> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  private boardSize: number = 12;
  private lastBoardPosition: number = 11;

  constructor() {
    let categorySize = 50;
    for (let i = 0; i < categorySize; i++) {
      this.popQuestions.push(this.createQuestion("Pop", i));
      this.scienceQuestions.push(this.createQuestion("Science", i));
      this.sportsQuestions.push(this.createQuestion("Sports", i));
      this.rockQuestions.push(this.createQuestion("Rock", i));
    }
  }

  private createQuestion(type: string, index: number): string {
    return type + " Question " + index;
  }

  public addPlayer(name: string): boolean {
    this.players.push(new Player(name));
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.howManyPlayers());

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayer]
  }

  private advanceInBoard(positions: number) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + positions;
    if (this.places[this.currentPlayer] > this.lastBoardPosition) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - this.boardSize;
    }
  }

  private nextPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.howManyPlayers())
      this.currentPlayer = 0;
  }

  public roll(roll: number) {
    let board = 12;
    let lastBoardPosition = 11;

    console.log(this.getCurrentPlayer().name + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(this.getCurrentPlayer().name + " is getting out of the penalty box");

        this.advanceInBoard(roll)

        console.log(this.getCurrentPlayer().name + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(this.getCurrentPlayer().name + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {

      this.advanceInBoard(roll)

      console.log(this.getCurrentPlayer().name + "'s new location is " + this.places[this.currentPlayer]);
      console.log("The category is " + this.currentCategory());
      this.askQuestion();
    }
  }

  private askQuestion(): void {
    if (this.currentCategory() == 'Pop')
      console.log(this.popQuestions.shift());
    if (this.currentCategory() == 'Science')
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == 'Sports')
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == 'Rock')
      console.log(this.rockQuestions.shift());
  }

  private currentCategory(): string {
    let popCategory = "Pop";
    let scienceCategory = "Science";
    let sportCategory = "Sports";
    let rockCategory = "Rock";

    if (this.places[this.currentPlayer] == 0)
      return popCategory;
    if (this.places[this.currentPlayer] == 4)
      return popCategory;
    if (this.places[this.currentPlayer] == 8)
      return popCategory;
    if (this.places[this.currentPlayer] == 1)
      return popCategory;
    if (this.places[this.currentPlayer] == 5)
      return scienceCategory;
    if (this.places[this.currentPlayer] == 9)
      return scienceCategory;
    if (this.places[this.currentPlayer] == 2)
      return sportCategory;
    if (this.places[this.currentPlayer] == 6)
      return sportCategory;
    if (this.places[this.currentPlayer] == 10)
      return sportCategory;
    return rockCategory;
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] == 6)
  }

  public wrongAnswer(): boolean {
    console.log('Question was incorrectly answered');
    console.log(this.getCurrentPlayer().name + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.nextPlayer();
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    if (this.inPenaltyBox[this.currentPlayer]) {
        if (this.isGettingOutOfPenaltyBox) {
          console.log('Answer was correct!!!!');
          this.purses[this.currentPlayer] += 1;
          console.log(this.getCurrentPlayer().name + " now has " +
          this.getCurrentPlayer().purse + " Gold Coins.");
  
          var winner = this.didPlayerWin();

          this.nextPlayer();
  
          return winner;
        } else {
          this.nextPlayer();
          return true;
        }
    } else {
      console.log("Answer was correct!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(this.getCurrentPlayer().name + " now has " +
          this.purses[this.currentPlayer] + " Gold Coins.");

      var winner = this.didPlayerWin();

      this.nextPlayer();
      return winner;
    }
  }
}