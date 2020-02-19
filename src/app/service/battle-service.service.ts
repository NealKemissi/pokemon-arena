import { Injectable } from '@angular/core';
import Attack from '../model/attack/attack';
import Pokemon from '../model/pokemon/pokemon';

@Injectable({
  providedIn: 'root'
})
export class BattleServiceService {

  private logs = [];

  constructor() { }

  initialyzeAttacker() : Pokemon {
    let attacksPokemon1: Array<Attack> = [
      new Attack("Lance-flamme", 50),
      new Attack("Ultralaser", 20),
      new Attack("Rapace", 35),
      new Attack("Dracochoc", 30)
    ];
    let attacker : Pokemon = new Pokemon("Dracaufeu", 50, 100, attacksPokemon1);
    return attacker;
  }

  initialyzeDefender() : Pokemon {
    let attacksPokemon2: Array<Attack> = [
      new Attack("Ball'Ombre", 50),
      new Attack("Poing Ombre", 20),
      new Attack("Dévorêve", 35),
      new Attack("Vibrobscure", 30)
    ];
    let defender: Pokemon = new Pokemon("Ectoplasma", 42, 100, attacksPokemon2);
    return defender;
  }

  /**
   * calcul la valeur de l'attaque
   * @param attacker
   * @param defender
   * @param attack
   * @return la valeur réel de l'attaque
   */
  calculateAttackRealValue(attacker : Pokemon, defender : Pokemon, attack: Attack): number {
    return Math.floor(
             Math.floor(
               Math.floor(2 * attacker._level / 5 + 2)
                * attacker._offensiveStat * attack._damage / defender._defensiveStat) / 50) + 2;
  }

  /**
   * choisit quel pokemon va attaquer en premier
   * @return l'attaquant qui va lancer la première attaque
   */
  firstToAttack(pokemon1 : Pokemon, pokemon2 : Pokemon) {
    if (pokemon1._speed === pokemon2._speed) {
      return (Math.random() < 0.5)? {attacker : pokemon1, defender : pokemon2} : {attacker : pokemon2, defender : pokemon1};
    } else {
      return (pokemon1._speed > pokemon2._speed) ? {attacker : pokemon1, defender : pokemon2} : {attacker : pokemon2, defender : pokemon1};
    }
  }

  onBattle(pokemon1 : Pokemon, pokemon2 : Pokemon) : void {
    let id : any;
    let logs : string = '';

    let order = this.firstToAttack(pokemon1, pokemon2);
    let attacker = order.attacker;
    let defender = order.defender;

    id = setInterval(() => {

      let specificAttack = attacker.selectRandomAttack();
      this.logs.push(' > ' + attacker._name.toUpperCase() + ' utilise ' + specificAttack._name.toUpperCase() + ' !<br/>');
      specificAttack._damage = this.calculateAttackRealValue(attacker, defender, specificAttack);
      defender.hitByAttack(specificAttack);
      this.logs.push('> ' + defender._name.toUpperCase() + ' perd ' + specificAttack._damage + ' PV<br/>');

      this.logs.push('================================== <br/>');

      if (attacker._pv <= 0 || defender._pv <= 0) {
        clearInterval(id);
        this.logs.push(defender._name.toUpperCase() + ' est KO !<br/>');
        this.logs.push('<strong>' + attacker._name.toUpperCase() + ' grand Vainqueur !</strong> GG WP '
        + defender._name.toUpperCase() + ' ! (Sheh aussi un peu)');
      }
      
      /** switch Attacker and defender **/
      const switch_pokemon = this.SwitchPokemon(attacker, defender);
      attacker = switch_pokemon.attacker;
      defender = switch_pokemon.defender;
      return logs;
    }, 2000);
  }

  getLogs() : String[] {
    return this.logs;
  }


  SwitchPokemon(attacker : Pokemon, defender: Pokemon) {
    let temp = attacker;
    attacker = defender;
    defender = temp;
    return {attacker : attacker, defender : defender};
  }

  /**
   * retourne le perdant du combat
   * @param pokemon1 
   * @param pokemon2 
   * @return celui qui a le moins de pv
   */
  public getLooser(pokemon1 : Pokemon, pokemon2 : Pokemon): Pokemon {
    return (pokemon1._pv < pokemon2._pv) ? pokemon1 : pokemon2;
  }
}
