import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pokemon from '../model/pokemon/pokemon';
import { PokemonInterface } from '../pokemon-interface';
import { BattleServiceService } from '../service/battle-service.service';
import { PokemonApiService } from '../service/pokemon-api.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {


  pokemonsList: Array<PokemonInterface> = [];
  list : string[] = ['charizard', 'venusaur','blastoise','pikachu', 'eevee', 'gengar', 'snorlax', 'weezing', 'onix', 'machamp', 'exeggutor', 'gyarados'];

  pokemonsSelected = [];

  constructor(
    private router: Router,
    private battleService: BattleServiceService,
    private apiService: PokemonApiService
  ) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons() {
    let pokemon : Pokemon;
    let pokemon_list : Pokemon[] = [];
    for(let i=0; i<this.list.length; i++){
      this.apiService.getPokemon(this.list[i]).subscribe(
        data => {
          pokemon = this.apiService.createPokemon(data);
          console.log(pokemon);
          pokemon_list.push(pokemon);
        }, error => {
          console.log(error);
        }, () => {
          pokemon_list.map(this.mapPokemonToPokemonInterface);
          this.pokemonsList  = (pokemon_list.map(this.mapPokemonToPokemonInterface));
        }
      )
    }
  }
  // private getAllPokemons() {
  //    this.pokemonsList = this.battleService.pokemons.map(this.mapPokemonToPokemonInterface);
  // }

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
