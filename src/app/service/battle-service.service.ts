import { Injectable } from '@angular/core';
import Attack from '../model/attack/attack';
import Pokemon from '../model/pokemon/pokemon';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, Observer, interval, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BattleServiceService {

  private logs: Array<string> = Array<string>();

  public isStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isOver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public dataPokemons: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

  private idInterval: number;

  attacksPokemon1: Array<Attack> = [
    new Attack('Lance-flamme', 50),
    new Attack("Ultralaser", 20),
    new Attack("Rapace", 35),
    new Attack("Dracochoc", 30)
  ];
  attacksPokemon2: Array<Attack> = [
    new Attack("Ball'Ombre", 50),
    new Attack("Poing Ombre", 20),
    new Attack("Dévorêve", 35),
    new Attack("Vibrobscure", 30)
  ];

  pokemons = [
    new Pokemon('Dracaufeu', 50, 100, this.attacksPokemon1, 50, 70, 70, '../../assets/img/dracaufeu_face.gif'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/ectoplasma_front.gif'),
    new Pokemon('Eevee', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/Eevee_front.gif'),
    new Pokemon('Pikachu', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/pikachu_front.gif'),
    new Pokemon('Snorlax', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/snorlax_front.gif'),
    new Pokemon('Tortank', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/tortank_front.gif'),
    new Pokemon('Weezing', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/weezing_front.gif'),
    new Pokemon('Leviator', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/leviator_front.gif'),
    new Pokemon('Onix', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/onix_front.gif'),
    new Pokemon('Machamp', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/machamp_front.gif'),
    new Pokemon('Noadkoko', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/noadkoko_front.gif'),
    new Pokemon('Venusaur', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/venusaur_front.gif')
  ];

  constructor() { }

  initialyzeAttacker(): Pokemon {
    let pokemon = null;
    this.dataPokemons.subscribe(data => {
      pokemon = this.pokemons.find(x => data[0] === x._name);
      if (pokemon._pv < 50) {
        pokemon._pv = 50;
      }
      if (pokemon) {
        localStorage.setItem('attacker', JSON.stringify(pokemon));
      }
      if (!pokemon && localStorage.getItem('attacker')) {
        pokemon = JSON.parse(localStorage.getItem('attacker'));
      }
    });
    return pokemon;
  }

  initialyzeDefender(): Pokemon {
    let pokemon = null;
    this.dataPokemons.subscribe(data => {
      pokemon = this.pokemons.find(x => data[1] === x._name);
      if (pokemon._pv < 50) {
        pokemon._pv = 50;
      }
      if (pokemon) {
        localStorage.setItem('defender', JSON.stringify(pokemon));
      }
      if (!pokemon && localStorage.getItem('defender')) {
        pokemon = JSON.parse(localStorage.getItem('defender'));
      }
    });
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

  onBattle(pokemon1: Pokemon, pokemon2: Pokemon): void {
    const order = this.firstToAttack(pokemon1, pokemon2);
    let attacker = order.attacker;
    let defender = order.defender;

    this.isStarted.next(true);
    this.isOver.next(false);

    // this.idInterval = window.setInterval(() => {
    let specificAttack = attacker.selectRandomAttack();
    this.logs.push(' > ' + attacker._name.toUpperCase() + ' utilise ' + specificAttack._name.toUpperCase() + ' !');
    specificAttack._damage = this.calculateAttackRealValue(attacker, defender, specificAttack);
    defender.hitByAttack(specificAttack);
    this.logs.push('> ' + defender._name.toUpperCase() + ' perd ' + specificAttack._damage + ' PV<br/>');

    this.logs.push('----------------------');

    specificAttack = defender.selectRandomAttack();
    this.logs.push(' > ' + defender._name.toUpperCase() + ' utilise ' + specificAttack._name.toUpperCase() + ' !');
    specificAttack._damage = this.calculateAttackRealValue(defender, attacker, specificAttack);
    attacker.hitByAttack(specificAttack);
    this.logs.push('> ' + attacker._name.toUpperCase() + ' perd ' + specificAttack._damage + ' PV');

    this.logs.push('==================================');

  }

  stop(): void {
    clearInterval(this.idInterval);
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


  SwitchPokemon(attacker: Pokemon, defender: Pokemon) {
    const temp = attacker;
    attacker = defender;
    defender = temp;
    return { attacker, defender };
  }

  /**
   * retourne le perdant du combat
   * @param pokemon1
   * @param pokemon2
   * @return celui qui a le moins de pv
   */
  public getResult(pokemon1: Pokemon, pokemon2: Pokemon): { winner, looser } {
    return {
      winner: (pokemon1._pv >= pokemon2._pv) ? pokemon1 : pokemon2,
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
