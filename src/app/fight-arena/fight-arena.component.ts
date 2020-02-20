import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import Pokemon from '../model/pokemon/pokemon';
import { BattleServiceService } from '../service/battle-service.service';

@Component({
  selector: 'app-fight-arena',
  templateUrl: './fight-arena.component.html',
  styleUrls: ['./fight-arena.component.css']
})
export class FightArenaComponent implements OnInit, OnDestroy {

  Attacker: Pokemon;
  Defender: Pokemon;

  idInterval: any;
  infos_battle: string = '';
  isStarted = false;
  isOver = false;
  looser: Pokemon;
  logs = [];
  begin: Date;
  end: Date;

  private subscription: Subscription;

  constructor(
    private battle_service: BattleServiceService
  ) { }

  ngOnInit(): void {
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
    this.begin = new Date();
    this.battle_service.getIsStarted()
      .subscribe(data => {
        this.isStarted = data;
      });
    this.battle_service.getisOver()
      .subscribe(data => {
        this.isOver = data;
      });

    this.subscription = interval(1000)
      .subscribe(() => {
        this.battle_service.onBattle(this.subscription, this.Attacker, this.Defender);
      });

    this.logs = this.battle_service.getLogs();
    this.end = new Date();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  stop(): void {
    this.subscription.unsubscribe();
  }

  reset(): void {
    this.begin = undefined;
    this.end = undefined;
    this.battle_service.clearLogs();
    this.Attacker = this.battle_service.initialyzeAttacker();
    this.Defender = this.battle_service.initialyzeDefender();
    this.launch();
  }
}
