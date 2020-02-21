import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observer, Observable } from 'rxjs';
import Pokemon from '../model/pokemon/pokemon';
import Attack from '../model/attack/attack';
import { PokemonAPI } from '../model/pokemon/pokemonAPI';
import Sprite from '../model/pokemon/sprite';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private baseUrl = 'http://pokeapi.co/api/v2/pokemon/';

  private attacks: Array<Attack> = [
    new Attack('Quick Attack', 35),
    new Attack("Double Kick", 20),
    new Attack("Hyper Beam", 50),
    new Attack("Body Slam", 30)
  ];

  constructor(private http : HttpClient) { }

  /**
   * retourne le pokemon a partie de l'api
   * @param name 
   * @return le pokemon
   */
  getPokemon(name : string) : Observable<PokemonAPI> {
    return this.http.get<PokemonAPI>(this.baseUrl + name);
  }

  /**
   * créer un pokemon avec ses vrai stats à partir de l'api
   * @param attacks 
   * @param pokemonApi
   * @return le vrai pokemon
   */
  createPokemon(pokemonApi: PokemonAPI) : Pokemon {
    let speed = pokemonApi.stats.find(
      x => x.stat.name == 'speed'
    ).base_stat;

    let pv = pokemonApi.stats.find(
      x => x.stat.name == 'hp'
    ).base_stat;

    let attack = pokemonApi.stats.find(
      x => x.stat.name == 'attack'
    ).base_stat;

    let defense = pokemonApi.stats.find(
      x => x.stat.name == 'defense'
    ).base_stat;

    let pokemon = new Pokemon(pokemonApi.name, speed, pv, this.attacks, null, attack, defense, new Sprite(pokemonApi.name));
    return pokemon;
  }
}
