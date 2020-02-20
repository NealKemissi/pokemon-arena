import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pokemon from '../model/pokemon/pokemon';
import { PokemonInterface } from '../pokemon-interface';
import { BattleServiceService } from './../service/battle-service.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {


  pokemonsList: Array<PokemonInterface> = [];

  pokemonsSelected = [];

  constructor(
    private router: Router,
    private battleService: BattleServiceService
  ) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  private getAllPokemons() {
     this.pokemonsList = this.battleService.pokemons.map(this.mapPokemonToPokemonInterface);
  }

  private mapPokemonToPokemonInterface(pokemon: Pokemon): PokemonInterface {
    return {
      _name: pokemon._name,
      _speed: pokemon._speed,
      _pv: pokemon._pv,
      _attacks: pokemon._attacks,
      _level: pokemon._level,
      _offensiveStat: pokemon._offensiveStat,
      _defensiveStat: pokemon._defensiveStat,
      _class: 'carMouseleave',
      _image: pokemon._sprite._front
    };
  }

  private mapToName(pokemon: PokemonInterface) {
    return pokemon._name;
  }

  zoom(e, pokemon: PokemonInterface) {
    if (this.pokemonsSelected.length < 2 && !this.pokemonsSelected.includes(pokemon)) {
      pokemon._class = 'carMouseOuver';
    }
  }

  dezoom(e, pokemon: PokemonInterface) {
    if (!this.pokemonsSelected.includes(pokemon)) {
      pokemon._class = 'carMouseleave';
    }
  }

  selectPokemon(pokemon: PokemonInterface): void {
    if (this.pokemonsSelected.length < 2) {
      this.pokemonsSelected.push(pokemon);
      pokemon._class = 'carSelected';
    }

    if (2 === this.pokemonsSelected.length) {

      const pokemons = this.pokemonsSelected.map(this.mapToName);
      this.router.navigate(['flightArena/' + pokemons[0] + '/' + pokemons[1]]);
    }
  }
}
