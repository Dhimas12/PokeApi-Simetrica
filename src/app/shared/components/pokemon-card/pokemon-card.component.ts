import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { favorite } from 'src/app/shared/models/favorities/favorities.model';
import { Pokemon } from 'src/app/shared/models/pokemons/pokemons.model';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  @Input() pokemon!:Pokemon;
  @Input() type:boolean = false;
  @Output() favoritePokemon = new EventEmitter<favorite>();
  
  constructor(private favoriteService:FavoriteService) { }

  get isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.pokemon.id);
  }

  saveFavorite(){
    this.favoritePokemon.emit({
      pokemonId: this.pokemon.id,
      alias: this.pokemon.name,
      createdAt: new Date()
    });
  }
}
