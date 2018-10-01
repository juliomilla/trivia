/**
 * Player class
 */
export class Player {

  private _name: string;
  private _purse: number;
  private _position: number;
  private _inPenaltyBox: boolean;

  constructor(name: string) {
    this._name = name;
    this._purse = 0;
    this._position = 0;
    this._inPenaltyBox = false;
  }

  /**
  * Gets the player name
  * @returns  Name of the player
  */
  get name(): string {
    return this._name;
  }

  /**
  * Gets the amount of coins on the player's purse
  * @returns  Amount of coins in the player's purse
  */
  get purse(): number {
    return this._purse;
  }

  /**
  * Gets the player's position
  * @returns  Position of the player
  */
  get position(): number {
    return this._position
  }

  /**
  * Checks if the player is in a penalty box
  * @returns  If the player is in a penalty box
  */
  get inPenaltyBox(): boolean {
    return this._inPenaltyBox;
  }

  /**
  * Sets the user position
  * @param position Position
  */
  set position(position: number) {
    this._position = position;
  }

  /**
  * Sets the user in a penalty box
  * @param inPenaltyBox   Penalty box status
  */
  set inPenaltyBox(inPenaltyBox: boolean) {
    this._inPenaltyBox = inPenaltyBox;
  }

  /**
  * Increments the amount of gold coins in the purse by 1
  */
  public incrementPurse() {
    this._purse += 1;
  }
}