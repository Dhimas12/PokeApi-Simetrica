import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { favorite } from 'src/app/shared/models/favorities/favorities.model';
import { Pokemon } from 'src/app/shared/models/pokemons/pokemons.model';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { PokemonsService } from 'src/app/shared/services/pokemon.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-Form.component.scss']
})
export class PokemonFormComponent implements OnInit {

  pokemon!:Pokemon;
  favorite?:favorite;
  pokemonId: number = 0;
  loading:boolean = false;
  aliasForm:FormGroup = new FormGroup({});
  constructor(private pokemonService: PokemonsService, 
              private favoriteService: FavoriteService,
              private router:Router) { }

  ngOnInit() {
    this.pokemonId = +this.router.url.split('/')[2];
    this.loading = true;
    this.pokemonService.getPokemon(this.pokemonId).subscribe({
      next: pokemon => {
        this.pokemon = pokemon;
      },
      complete: () => {
        this.loading = false;
      }
    } );
    
    this.favorite = this.favoriteService.getFavorite(this.pokemonId)
    if(this.favorite)
      this.favorite.createdAt = new Date(this.favorite.createdAt);
        
    this.setForm();
  }

  setForm() {
    this.aliasForm.setControl('alias', new FormControl(this.favorite?.alias ?? ''));
  }

  saveFavorite() {
    if(this.aliasForm.invalid){
      this.aliasForm.markAllAsTouched();
      return;
    }

    let favorite = this.favoriteService.getFavorite(this.pokemonId); 
    if(favorite){
      favorite.alias = this.aliasForm.get('alias')?.value;
      this.favoriteService.updateFavorite(favorite);
    }
    else{
      favorite = {
        pokemonId: this.pokemonId,
        alias: this.aliasForm.get('alias')?.value,
        createdAt: new Date()
      };
      this.favoriteService.saveFavorite(favorite);
    }

    Swal.fire({
      title: 'Added!',
      text: 'Your favorite has added to favorite.',
      showConfirmButton: false,
      timer: 2000
    })
    this.router.navigate(['/']);
  }

  deleteFavorite() {
    this.favoriteService.deleteFavorite(this.pokemonId);
    Swal.fire({
      title: 'Deleted!',
      text: 'The pokemon has been deleted from favorites.',
      showConfirmButton: false,
      timer: 2000
    })
    this.router.navigate(['/']);
  }

  formatDate(date?:Date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  }
}
