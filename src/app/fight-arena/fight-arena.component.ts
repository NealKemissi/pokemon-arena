import { Component, OnInit } from '@angular/core';
import Pokemon from '../model/pokemon/pokemon';
import Attack from '../model/attack/attack';

@Component({
  selector: 'app-fight-arena',
  templateUrl: './fight-arena.component.html',
  styleUrls: ['./fight-arena.component.css']
})
export class FightArenaComponent implements OnInit {

  private Attacker: Pokemon;
  private Defender: Pokemon;

  constructor() { }

  ngOnInit(): void {
    this.firstToAttack();
    while (this.Attacker._pv > 0 && this.Defender._pv > 0) {
      const specificAttack = this.Attacker.selectRandomAttack();
      console.log(this.Attacker._name + ' attaque avec ' + specificAttack._name);
      this.impactDefenderPokemonHealth(this.Defender, this.calculateAttackRealValue(specificAttack));

      console.log('Il deal ' + this.calculateAttackRealValue(specificAttack) + ' points de dommage, UN VRAI MALADE !');
      console.log('Laissant ' + this.Defender._name + ' avec maintenant ' + this.Defender._pv + 'PV');
      console.log();
      console.log('Au tour de ' + this.Defender._name + ' d\'attaquer !');
      waits(2000);
      this.switchAttackerAndDefender();
    }

    console.log(' . . . Ah nan, il est juste au sol ' + this.Attacker._name + ' en fait :/');
    console.log(this.Defender._name + ' grand Vainqueur ! GG WP ' + this.Defender._name + ' ! (Sheh aussi un peu)');
  }
  /**
   * choisit quel pokemon va attaquer en premier
   * @return l'attaquant qui va lancer la première attaque
   */
  firstToAttack(): Pokemon {
    if (this.Defender._speed === this.Attacker._speed) {
      if (Math.random() < 0.5) {
        this.switchAttackerAndDefender();
      }
    } else {
      if (this.Attacker._speed < this.Defender._speed) {
        this.switchAttackerAndDefender();
      }
    }
    return this.Attacker;
  }

  /**
   * l'attaquant devient défenseur, et le défenseur devient attaquant
   */
  switchAttackerAndDefender() {
    let temp: Pokemon;
    temp = this.Attacker;
    this.Attacker = this.Defender;
    this.Defender = temp;
  }

  /**
   * calcul la valeur de l'attaque
   * @param attacker
   * @param defender
   * @param attack
   * @return la valeur réel de l'attaque
   */
  calculateAttackRealValue(attack: Attack): number {
    return Math.floor(
             Math.floor(
               Math.floor(2 * this.Attacker._level / 5 + 2)
                * this.Attacker._offensiveStat * attack._damage / this.Defender._defensiveStat) / 50) + 2;
  }

  /**
   * modifie les pv d'un pokemon
   * @param pokemon
   * @param value
   */
  impactDefenderPokemonHealth(pokemon: Pokemon, value: number) {
    pokemon.modifyHealth(value);
  }


}
