import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import Attack from '../model/attack/attack';
import Pokemon from '../model/pokemon/pokemon';
import Sprite from '../model/pokemon/sprite';
@Injectable({
  providedIn: 'root'
})
export class BattleServiceService {

  private logs: Array<string> = Array<string>();

  public isStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isOver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public dataPokemons: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

  attacksPokemon1: Array<Attack> = [
    new Attack('Vive-attaque', 50),
    new Attack("Morsure", 20),
    new Attack("Ultralaser", 35),
    new Attack("Plaquage", 30)
  ];
  attacksPokemon2: Array<Attack> = [
    new Attack('Vive-attaque', 50),
    new Attack("Morsure", 20),
    new Attack("Ultralaser", 35),
    new Attack("Plaquage", 30)
  ];

  pokemons = [
    new Pokemon('Dracaufeu', 50, 100, this.attacksPokemon1, 50, 70, 70, new Sprite('charizard')),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('gengar')),
    new Pokemon('Eevee', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('eevee')),
    new Pokemon('Pikachu', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('pikachu')),
    new Pokemon('Snorlax', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('snorlax')),
    new Pokemon('Tortank', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('blastoise')),
    new Pokemon('Weezing', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('weezing')),
    new Pokemon('Leviator', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('gyrados')),
    new Pokemon('Onix', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('onix')),
    new Pokemon('Machamp', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('machamp')),
    new Pokemon('Noadkoko', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('exeggutor')),
    new Pokemon('Venusaur', 42, 100, this.attacksPokemon2, 50, 70, 70, new Sprite('venusaur'))
  ];

  constructor() { }

  initialyzeAttacker(attacker): Pokemon {
    const pokemon: Pokemon = this.pokemons.find(x => attacker === x._name);
    pokemon._pv = 100;
    return pokemon;
  }

  initialyzeDefender(defender): Pokemon {
    const pokemon: Pokemon = this.pokemons.find(x => defender === x._name);
    pokemon._pv = 100;
    return pokemon;
  }

  /**
   * calcul la valeur de l'attaque
   * @param attacker
   * @param defender
   * @param attack
   * @return la valeur réel de l'attaque
   */
  calculateAttackRealValue(attacker: Pokemon, defender: Pokemon, attack: Attack): number {
    return Math.floor(
      Math.floor(
        Math.floor(2 * attacker._level / 5 + 2)
        * attacker._offensiveStat * attack._damage / defender._defensiveStat) / 50) + 2;
  }

  /**
   * choisit quel pokemon va attaquer en premier
   * @return l'attaquant qui va lancer la première attaque
   */
  firstToAttack(pokemon1: Pokemon, pokemon2: Pokemon) {
    if (pokemon1._speed === pokemon2._speed) {
      return (Math.random() < 0.5) ? { attacker: pokemon1, defender: pokemon2 } : { attacker: pokemon2, defender: pokemon1 };
    } else {
      return (pokemon1._speed > pokemon2._speed) ? { attacker: pokemon1, defender: pokemon2 } : { attacker: pokemon2, defender: pokemon1 };
    }
  }

  onBattle(subscription: Subscription, pokemon1: Pokemon, pokemon2: Pokemon): void {
    const order = this.firstToAttack(pokemon1, pokemon2);
    const attacker = order.attacker;
    const defender = order.defender;

    this.isStarted.next(true);
    this.isOver.next(false);

    if (attacker._pv > 0 && defender._pv > 0) {
      const specificAttack = attacker.selectRandomAttack();
      this.logs.push(' > ' + attacker._name.toUpperCase() + ' utilise ' + specificAttack._name.toUpperCase() + ' !');
      specificAttack._damage = this.calculateAttackRealValue(attacker, defender, specificAttack);
      defender.hitByAttack(specificAttack);
      this.logs.push('> ' + defender._name.toUpperCase() + ' perd ' + specificAttack._damage + ' PV<br/>');

      this.logs.push('----------------------');
    }

    if (attacker._pv > 0 && defender._pv > 0) {
      const specificAttack = defender.selectRandomAttack();
      this.logs.push(' > ' + defender._name.toUpperCase() + ' utilise ' + specificAttack._name.toUpperCase() + ' !');
      specificAttack._damage = this.calculateAttackRealValue(defender, attacker, specificAttack);
      attacker.hitByAttack(specificAttack);
      this.logs.push('> ' + attacker._name.toUpperCase() + ' perd ' + specificAttack._damage + ' PV');

      this.logs.push('==================================');
    }

    this.cancelTime(subscription, attacker, defender);
  }

  cancelTime(subscription: Subscription, attacker, defender) {
    if (attacker._pv <= 0 || defender._pv <= 0) {
      const looser: string = this.getResult(attacker, defender).looser._name;
      this.addLog(' > ' + looser.toUpperCase() + ' est KO !');
      const winner: string = this.getResult(attacker, defender).winner._name;
      this.addLog(' > ' + winner.toUpperCase() + ' a gagné !');
      this.isStarted.next(false);
      this.isOver.next(true);
      subscription.unsubscribe();
    }
  }

  getLogs(): string[] {
    return this.logs;
  }

  addLog(message: string): void {
    this.logs.push(message);
  }

  clearLogs(): void {
    this.logs = Array<string>();
  }

  /**
   * retourne le perdant du combat
   * @param pokemon1
   * @param pokemon2
   * @return celui qui a le moins de pv
   */
  public getResult(pokemon1: Pokemon, pokemon2: Pokemon): { winner, looser } {
    return {
      winner: (pokemon1._pv > pokemon2._pv) ? pokemon1 : pokemon2,
      looser: (pokemon1._pv < pokemon2._pv) ? pokemon1 : pokemon2
    };
  }

  public getIsStarted() {
    return this.isStarted;
  }

  public getisOver() {
    return this.isOver;
  }

}
