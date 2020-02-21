export interface PokemonAPI {
  name : string;
  stats : Array<Stat>;
}

export class Stat {
    base_stat : number;
    effort : number;
    stat : {
        name : string;
    }
}