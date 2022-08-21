import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'types'
})

export class TypesPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return `assets/icons/types/${value}.png`;
    }
}