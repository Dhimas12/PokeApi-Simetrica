import { Injectable } from '@angular/core';
import { favorite } from '../models/favorities/favorities.model';

@Injectable({providedIn: 'root'})
export class FavoriteService {
    constructor() { }

    public get getFavorites(): favorite[] {
        return JSON.parse(sessionStorage.getItem('favorites') ?? '[]');
    }

    public get favoritesIds(): number[] {
        return this.getFavorites.map(f => f.pokemonId);
    }

    saveFavorite(favorite: favorite) {
        const favorites = this.getFavorites;
        favorites.push(favorite);
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    deleteFavorite(id: number) {
        const favorites = this.getFavorites;
        const index = favorites.findIndex(f => f.pokemonId === id);
        if(index !== -1) {
            favorites.splice(index, 1);
            sessionStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    updateFavorite(favorite: favorite) {
        const favorites = this.getFavorites;
        const index = favorites.findIndex(f => f.pokemonId === favorite.pokemonId);
        favorites[index] = favorite;
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
    }

    isFavorite(pokemonId: number): boolean {
        const favorites = this.getFavorites;
        return favorites.some(f => f.pokemonId === pokemonId);
    }

    getFavorite(pokemonId: number): favorite | undefined {
        const favorites = this.getFavorites;
        return favorites.find(f => f.pokemonId === pokemonId);
    }
}