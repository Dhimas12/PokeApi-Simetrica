import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';
import { TypesPipe } from '../shared/pipes/types.pipe';
import { PagesRoutingModule } from './pages-routing.module';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonCardComponent } from '../shared/components/pokemon-card/pokemon-card.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        PagesRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        PagesRoutingModule,
        PokemonsListComponent,
        PokemonCardComponent,
    ],
    declarations: [
        PokemonsListComponent,
        PokemonCardComponent,
        PokemonFormComponent,
        TypesPipe
    ],
    providers: [],
})
export class PagesModule { }
