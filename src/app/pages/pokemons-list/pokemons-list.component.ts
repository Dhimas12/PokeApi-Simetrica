import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { favorite } from 'src/app/shared/models/favorities/favorities.model';
import { Pokemon } from 'src/app/shared/models/pokemons/pokemons.model';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { PokemonsService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss']
})
export class PokemonsListComponent implements OnInit {

  pokemons:Pokemon[] = [];
  next?: string;
  previous?:string;
  
  petitionHandler!:any;
  loading:boolean = false;
  favoritiesOrAll:boolean = false;

  constructor(private pokemonService:PokemonsService,
              private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(url?:string){
    this.loading = true;
    if(this.petitionHandler)
      this.petitionHandler.unsubscribe();

    this.petitionHandler = this.pokemonService.getPokemons(url).subscribe({
      next: pokemons => {
        this.next = pokemons.response.next;
        this.previous = pokemons.response.previous;
        console.log(pokemons.response)
        
        pokemons.promises.subscribe({
          next: _pokemons => {
            this.pokemons = _pokemons as Pokemon[]
          },
          complete: () => {
            this.loading = false;
          }
        });
      },
    });
  }

  getFavoritesPokemon(){
    this.loading = true;
    if(this.petitionHandler)
      this.petitionHandler.unsubscribe();

    let ids = this.favoriteService.favoritesIds;
    this.petitionHandler = this.pokemonService.getFavorities(ids).subscribe({
      next: favorites => {
        this.pokemons = favorites as Pokemon[];
      },
      complete: () => {
        this.loading = false;
      }
    });


  }

  markAsFavorite(favorite:any) {
    if(this.favoriteService.isFavorite(favorite.pokemonId)){
      this.favoriteService.deleteFavorite(favorite.pokemonId);
    }
    else{
      this.favoriteService.saveFavorite(favorite);
    }
  }

  displayItems(){
    this.favoritiesOrAll = !this.favoritiesOrAll;
    this.pokemons = [];

    if(this.favoritiesOrAll){
      this.getFavoritesPokemon();
    }
    else{
      this.next = undefined;
      this.getPokemons();
    }

  }

  goNext(){
    this.getPokemons(this.next);
  }

  goPrevious(){
    this.getPokemons(this.previous);
  }
}
