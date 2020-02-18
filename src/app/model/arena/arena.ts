import Pokemon from "../pokemon/pokemon";
import Attack from "../attack/attack";

export class fightClass {
	private Attacker: Pokemon
	private Defender: Pokemon
	constructor(_Attacker: Pokemon, _Defender: Pokemon){
		this.Attacker = _Attacker
		this.Defender = _Defender
	}
	getAttacker(): Pokemon{
		return this.Attacker
	}
	getDefender(): Pokemon{
		return this.Defender
	}
	firstToAttack(): Pokemon{
		if (this.Defender.getSpeed() === this.Attacker.getSpeed()){
			if (Math.random()<0.5){
				this.switchAttackerAndDefender()
			}
		}else{
			if (this.Attacker.getSpeed() < this.Defender.getSpeed()){
				this.switchAttackerAndDefender()	
			}
		}
		return this.Attacker
	}
	calculateAttackRealValue( Attack: Attack): number{
		return Math.floor(Math.floor(Math.floor(2*this.Attacker.getLevel()/5 + 2)*this.Attacker.getOffensiveStat()*Attack.getDamage()/this.Defender.getDefensiveStat())/50)+2
	}
	impactAttackedPokemonHealth(pokemon: Pokemon, value: number){
		pokemon.modifyHealth(value)
	}
	switchAttackerAndDefender(){
		let temp: Pokemon
		temp = this.Attacker
		this.Attacker = this.Defender
		this.Defender = temp
		
	}
}