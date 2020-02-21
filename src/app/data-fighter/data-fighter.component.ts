import { Component, OnInit, Input } from '@angular/core';
import Pokemon from '../model/pokemon/pokemon';

@Component({
  selector: 'app-data-fighter',
  templateUrl: './data-fighter.component.html',
  styleUrls: ['./data-fighter.component.css']
})
export class DataFighterComponent implements OnInit {

  @Input() pokemonData : Pokemon;

  constructor() { }

  ngOnInit(): void {
    console.log(this.pokemonData);
  }

}
