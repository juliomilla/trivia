import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/game-runner';
import {Game} from '../src/game';

describe('The test environment', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });

  it("should access game", function () {
    expect(GameRunner).to.not.be.undefined;
  });
});

describe('Game', () => {
  let game = new Game();
  game.addPlayer("Chet");
  game.addPlayer("Pat");
  game.addPlayer("Sue");

  it("should be defined", function () {
    expect(game).to.not.be.undefined;
  });

  it("should have a board size of 12", function () {
    expect(game.getBoardSize).to.equal(12);
  });

  it("should have 3 players", function () {
    expect(game.howManyPlayers()).to.equal(3);
  });

  it("should return the current player", function () {
    expect(game.getCurrentPlayer().name).to.equal("Chet");
  });

  it("should play a turn and move to the next player", function () {
    let dice = Math.floor(Math.random() * 6) + 1;
    game.newTurn(dice);
    expect(game.didGameFinish()).to.equal(false)
    expect(game.getCurrentPlayer().name).to.equal("Pat");
  });

  it("should return the pop category when the player is in the 0 position", function () {
    game.getCurrentPlayer().position = 0;
    expect(game.currentCategory()).to.equal("Pop")
  });

  it("should return the science category when the player is in the 1 position", function () {
    game.getCurrentPlayer().position = 1;
    expect(game.currentCategory()).to.equal("Science")
  });

  it("should return the sports category when the player is in the 2 position", function () {
    game.getCurrentPlayer().position = 2;
    expect(game.currentCategory()).to.equal("Sports")
  });

  it("should return the rock category when the player is in the 3 position", function () {
    game.getCurrentPlayer().position = 3;
    expect(game.currentCategory()).to.equal("Rock")
  });

  it("should reach the end", function () {
    var dice = Math.floor(Math.random() * 6) + 1;
    do {
      dice = Math.floor(Math.random() * 6) + 1;
    } while (game.newTurn(dice));
    expect(game.didGameFinish()).to.equal(true);
    expect(game.getCurrentPlayer().purse).to.equal(6);
  });
});

