import { Component, OnInit } from '@angular/core';
import Pokemon from '../model/pokemon/pokemon';
import Attack from '../model/attack/attack';

@Component({
  selector: 'app-fight-arena',
  templateUrl: './fight-arena.component.html',
  styleUrls: ['./fight-arena.component.css']
})
export class FightArenaComponent implements OnInit {

  private Attacker: Pokemon
	private Defender: Pokemon

  constructor() { }

  ngOnInit(): void {
  }

  /***/
  getAttacker(): Pokemon{
		return this.Attacker
  }
  /***/
	getDefender(): Pokemon{
		return this.Defender
  }

  /**
   * choisit quel pokemon va attaquer en premier
   * @return l'attaquant qui va lancer la première attaque
   */
  firstToAttack(): Pokemon {
		if (this.Defender._speed === this.Attacker._speed) {
		  if (Math.random()<0.5) {
				this.switchAttackerAndDefender()
			}
		} else {
			if (this.Attacker._speed < this.Defender._speed) {
				this.switchAttackerAndDefender()	
			}
		}
		return this.Attacker
  }
  
  /**
   * l'attaquant devient défenseur, et le défenseur devient attaquant
   */
  switchAttackerAndDefender(){
		let temp: Pokemon
		temp = this.Attacker
		this.Attacker = this.Defender
		this.Defender = temp	
	}
  
  /**
   * calcul la valeur de l'attaque
   * @param attacker
   * @param defender
   * @param attack
   * @return la valeur réel de l'attaque 
   */
  calculateAttackRealValue(attacker : Pokemon, defender: Pokemon, attack: Attack): number{
		return Math.floor(Math.floor(Math.floor(2*attacker._level/5 + 2)*attacker._offensiveStat*attack._damage/defender._defensiveStat)/50)+2
  }
  
  /**
   * modifie les pv d'un pokemon
   * @param pokemon 
   * @param value 
   */
  impactAttackedPokemonHealth(pokemon: Pokemon, value: number){
		pokemon.modifyHealth(value)
  }
}
