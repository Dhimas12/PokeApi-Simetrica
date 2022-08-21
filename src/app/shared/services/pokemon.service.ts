import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseRespone.model';
import { Pokemon } from '../models/pokemons/pokemons.model';
import { forkJoin } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PokemonsService {
    baseUrl:string = ""
    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiUrl ?? '';
    }

    getPokemons(url?:string) {
        return this.http.get<BaseResponse<Pokemon>>(
            url ?? 
            `${this.baseUrl}pokemon?limit=9&offset=0`
        ) 
        .pipe(
            map(response => {
                let promises:any = []

                response.results.forEach(pokemon => {
                    if(pokemon.url)
                        promises.push(this.http.get(pokemon.url))
                });

                return {promises: forkJoin(promises), response}
            }),
        ); 
    }
    
    getPokemon(id:number) {
        return this.http.get<Pokemon>(
            `${this.baseUrl}pokemon/${id}`
        );
    }

    getPokemonSpecies(id:number) {
        return this.http.get<Pokemon>(
            `${this.baseUrl}pokemon-species/${id}`
        );
    }

    getFavorities(favorities:number[]){
        let promises:any = []

        favorities.forEach(id => {
            promises.push(this.getPokemon(id))
        })

        return forkJoin(promises)
    }
}