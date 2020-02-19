import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Attack from '../model/attack/attack';
import Pokemon from '../model/pokemon/pokemon';

@Component({
  selector: 'app-fight-arena',
  templateUrl: './fight-arena.component.html',
  styleUrls: ['./fight-arena.component.css']
})
export class FightArenaComponent implements OnInit {

  idInterval : any;
  attacksPokemon1: Array<Attack> = [
    new Attack("Lance-flamme", 50),
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
  Attacker: Pokemon = new Pokemon("Dracaufeu", 50, 100, this.attacksPokemon1);
  Defender: Pokemon = new Pokemon("Ectoplasma", 42, 100, this.attacksPokemon2);


  infos_battle : string = "";

  isStarted = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.openLegalNotice();

  }

  /**
   * permet d'attendre une fois qu'un pokemon a attaqué.
   * @param ms
   */
  wait(ms: number){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
  /**
   * choisit quel pokemon va attaquer en premier
   * @return l'attaquant qui va lancer la première attaque
   */
  firstToAttack(): void {
    if (this.Defender._speed === this.Attacker._speed) {
      if (Math.random() < 0.5) {
        this.switchAttackerAndDefender();
      }
    } else {
      if (this.Attacker._speed < this.Defender._speed) {
        this.switchAttackerAndDefender();
      }
    }
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

  launch() : void {
    this.isStarted = true;
    this.firstToAttack();

    this.idInterval = setInterval(() => {

      let specificAttack = this.Attacker.selectRandomAttack();
      this.infos_battle += '> ' + this.Attacker._name.toUpperCase() + ' utilise ' + specificAttack._name.toUpperCase() + ' !<br/>';
      specificAttack._damage = this.calculateAttackRealValue(specificAttack);
      this.Defender.hitByAttack(specificAttack);
      this.infos_battle += '> ' + this.Defender._name.toUpperCase() + ' perd ' + specificAttack._damage + ' PV <br/>';

      this.infos_battle += '================================== <br/>';

      if (this.Attacker._pv <= 0 || this.Defender._pv <= 0) {
        clearInterval(this.idInterval);
        this.infos_battle += this.Defender._name.toUpperCase() + ' est KO !<br/>';
        this.infos_battle += '<strong>' + this.Attacker._name.toUpperCase() + ' grand Vainqueur !</strong> GG WP '
        + this.Defender._name.toUpperCase() + ' ! (Sheh aussi un peu)';
      }

      this.switchAttackerAndDefender();
    }, 2000);
  }

  public getLooser(): Pokemon {
    let pokemomLooser;
    if (this.Attacker._pv <= 0) {
      pokemomLooser = this.Attacker;
    }
    if (this.Attacker._pv <= 0) {
      pokemomLooser = this.Defender;
    }
    return pokemomLooser;
  }

}
