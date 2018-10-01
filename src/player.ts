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

  get name(): string {
    return this._name;
  }

  get purse(): number {
    return this._purse;
  }

  get position(): number {
    return this._position
  }

  get inPenaltyBox(): boolean {
    return this._inPenaltyBox;
  }

  set position(position: number) {
    this._position = position;
  }

  set inPenaltyBox(inPenaltyBox: boolean) {
    this._inPenaltyBox = inPenaltyBox;
  }

  public incrementPurse() {
    this._purse += 1;
  }
}