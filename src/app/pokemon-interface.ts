import Attack from './model/attack/attack';

export interface PokemonInterface {
  _name: string;
  _speed: number;
  _pv: number;
  _attacks: Array<Attack>;
  _level: number;
  _offensiveStat: number;
  _defensiveStat: number;
  _class: string;
  _image: string;
}
