import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Attack from '../model/attack/attack';
import Pokemon from '../model/pokemon/pokemon';
import { BattleServiceService } from '../service/battle-service.service';

@Component({
  selector: 'app-fight-arena',
  templateUrl: './fight-arena.component.html',
  styleUrls: ['./fight-arena.component.css']
})
export class FightArenaComponent implements OnInit {

  Attacker: Pokemon;
  Defender: Pokemon;

  idInterval: any;
  infos_battle: string = "";
  isStarted = false;
  isOver = false;
  looser: Pokemon;
  logs = [];

  constructor(
    public dialog: MatDialog,
    public battle_service: BattleServiceService
  ) { }

  ngOnInit(): void {
    // this.openLegalNotice();
    this.Attacker = this.battle_service.initialyzeAttacker();
    this.Defender = this.battle_service.initialyzeDefender();
  }



  /**
   * modifie les pv d'un pokemon
   * @param pokemon
   * @param value
   */
  impactDefenderPokemonHealth(pokemon: Pokemon, value: number) {
    pokemon.modifyHealth(value);
  }

  launch(): void {
    this.battle_service.getIsStarted()
      .subscribe(data => {
        this.isStarted = data;
      });
    this.battle_service.getisOver()
      .subscribe(data => {
        this.isOver = data;
      });
    this.battle_service.onBattle(this.Attacker, this.Defender);
    this.logs = this.battle_service.getLogs();
  }

  stop(): void {
    this.battle_service.stop();
  }

  reset(): void {
  }
}
