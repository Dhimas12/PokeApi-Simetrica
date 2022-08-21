import { BaseModel } from "../baseModel.model";

export interface Pokemon extends BaseModel {
    name: string;
    url?:string;
    weight: number;
    height: number;
    base_experience: number;
    location_area_encounters: string;
    is_default: boolean;
    order: number;

    sprites: Sprites;
    types: Type[];
    abilities: Ability[];
}

export interface Ability {
    is_hidden: boolean;
    slot: number;
    ability: AbilityInfo;
}

export interface AbilityInfo {
    name: string;
    url: string;
}

export interface Sprites {
    front_default: string;
    front_shiny: string;
    front_default_female: string;
    front_shiny_female: string;

    back_default: string;
    back_shiny: string;
    back_default_female: string;
    back_shiny_female: string;
}

export interface Type{
    slot: number;
    type: {
        name:string;
        url: string;
    }
}