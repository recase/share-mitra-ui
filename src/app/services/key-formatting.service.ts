import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyFormattingService {
  constructor() {}

  // to convert the snake case object key to camel case
  public toCamel = (s: string) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('_', '');
    });
  };

  // to convert the camel case object key to snake case
  public toSnake = (s: string) => {
    return s
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join('_');
  };

  private isArray(a: any) {
    return Array.isArray(a);
  }

  private isObject(o: any) {
    return o === Object(o) && !this.isArray(o) && typeof o !== 'function';
  }

  public convertKeys(o: any, destinationFormat = 'snake') {
    let fn: any;
    if (destinationFormat === 'snake') {
      fn = this.toSnake;
    } else if (destinationFormat === 'camel') {
      fn = this.toCamel;
    }
    if (this.isObject(o)) {
      const n: { [index: string]: any } = {};

      Object.keys(o).forEach((k) => {
        // tslint:disable-next-line
        n[fn(k)] = this.convertKeys(o[k], destinationFormat);
      });

      return n;
    } else if (this.isArray(o)) {
      return o.map((i: any) => {
        return this.convertKeys(i, destinationFormat);
      });
    }
    return o;
  }
}
