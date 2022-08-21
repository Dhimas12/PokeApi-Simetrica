import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';

const routes: Routes = [
  { path: '', component: PokemonsListComponent },
  { path: ':id', component: PokemonFormComponent },

  { path: '**', redirectTo: 'pokemons', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
