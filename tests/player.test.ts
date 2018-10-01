import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Player} from '../src/player';


describe('Player', () => {
  let player = new Player('Julio');

  it("should be defined", function () {
    expect(player).to.not.be.undefined;
  });

  it("should have the proper name", function () {
    expect(player.name).to.equal('Julio');
  });

  it("should have 0 coins by default", function () {
    expect(player.purse).to.equal(0);
  });

  it("should start in the initial position", function () {
    expect(player.position).to.equal(0);
  });

  it("should not start in the penalty box", function () {
    expect(player.inPenaltyBox).to.equal(false);
  });

  it("should increment the coins in the purse", function () {
    player.incrementPurse();
    expect(player.purse).to.equal(1);
  });

  it("should change the penalty box status", function () {
    player.inPenaltyBox = true;
    expect(player.inPenaltyBox).to.equal(true);
  });

  it("should update its position", function () {
    player.position = 6;
    expect(player.position).to.equal(6);
  });
});
