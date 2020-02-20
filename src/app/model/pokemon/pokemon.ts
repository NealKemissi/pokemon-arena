import Attack from '../attack/attack';
import Sprite from './sprite';

export default class Pokemon {

  /** constructeur **/
  constructor(
    public _name?: string,
    public _speed?: number,
    public _pv?: number,
    public _attacks?: Array<Attack>,//= new Array(4)
    public _level: number = 50,
    public _offensiveStat: number = 70,
    public _defensiveStat: number = 70,
    public _sprite?: Sprite
  ) {
  }

  get attacks() {
    return this._attacks;
  }
  set attacks(attacks: Array<Attack>) {
    if (attacks.length > 4) {
      throw new Error('le Pokemon ne peut pas avoir plus de 4 capacités !');
    }
    this._attacks = attacks;
  }

  /**
   * modifie la vie du pokemon
   * @param damage
   */
  public modifyHealth(damage: number) {
    this._pv -= damage;
  }
  /**
   * lance une attaque au hasard
   * @return l'attaque à lancer
   */
  public selectRandomAttack(): Attack {
    return this._attacks[Math.floor(Math.random() * 3.9)];
  }
  /**
   * degats subit lors d'une attaque
   * @param attack
   * @return les pv restants
   */
  public hitByAttack(attack: Attack): number {
    this._pv -= attack._damage;
    return this._pv;
  }
}
