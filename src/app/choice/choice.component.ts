import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Attack from '../model/attack/attack';
import Pokemon from '../model/pokemon/pokemon';
import { PokemonInterface } from '../pokemon-interface';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

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
    new Pokemon('Dracaufeu', 50, 100, this.attacksPokemon1, 50, 70, 70, '../../assets/img/dracaufeu_face.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/gengar-sprite-png-2.gif'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png'),
    new Pokemon('Ectoplasma', 42, 100, this.attacksPokemon2, 50, 70, 70, '../../assets/img/dracaufeu.png')
  ];

  pokemonsList = [];

  pokemonsSelected = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  private getAllPokemons() {
     this.pokemonsList = this.pokemons.map(this.mapPokemonToPokemonInterface);
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
      _image: pokemon._image
    };
  }

  zoom(e, pokemon: PokemonInterface) {
    if (this.pokemonsSelected.length < 2) {
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
      this.router.navigate(['flightArena']);
    }
  }
}
