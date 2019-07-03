import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RollCollection } from '../models/roll-collection';
import { Entry } from '../models/entry';
import { RollTable } from '../models/roll-table';
import { Restrictions } from '../models/restrictions';

@Injectable()
export class TableService {
  constructor(private http: HttpClient) {}

  get(tableId: string): Observable<RollCollection> {
    return this.http.get<RollCollection>('assets/tables/' + tableId + '.json')
      .pipe(
        catchError(this.handleError)
      );
  }

  roll(tableId: string, restrictions: Restrictions, entryKey = 'init') {
    return this.get(tableId).pipe(
      map(data => this.processRoll(data, restrictions, entryKey))
    );
  }

  private processRoll(data: RollCollection, restrictions: Restrictions, entryKey: string) {
    let output = '';

    if (entryKey === 'init') {
      output = data.init;
    } else if (data.parts.hasOwnProperty(entryKey)) {
      output = this.subRoll(this.fetchRolls(data, restrictions, entryKey));
    } else {
      return '';
    }

    const parts = this.findParts(output);

    parts.forEach((part: string) => {
      output = this.processParts(data, restrictions, part, output);
    });

    return output;
  }

  private processParts(data: RollCollection, restrictions: Restrictions, part: string, output: string) {
    if (part[1].includes('.')) {
      const splitPart = part[1].split('.');
      this.roll(splitPart[0], restrictions, splitPart[1]).toPromise()
        .then(rollOutput => output = output.replace(part[0], rollOutput));
    } else if (data.parts.hasOwnProperty(part[1])) {
      output = output.replace(part[0], this.replacePart(data, restrictions, part[1]));
    }

    return output;
  }

  private fetchRolls(data: RollCollection, restrictions: Restrictions, entryKey: string) {
    let table: Entry[] = [];

    data.parts[entryKey].forEach((rollTable: RollTable) => {
      if (this.checkRestrictions(restrictions, rollTable.restrictions)) {
        table = table.concat(rollTable.entries);
      }
    });

    return table;
  }

  private replacePart(data: RollCollection, restrictions: Restrictions, entryKey: string) {
    let pick: string = this.subRoll(this.fetchRolls(data, restrictions, entryKey));
    const additionalParts: string[] = this.findParts(pick);

    if (additionalParts.length > 0) {
      additionalParts.forEach((subPart: string) => {
        pick = this.processParts(data, restrictions, subPart, pick);
      });
    }

    return pick;
  }

  private checkRestrictions(rollRes: Restrictions, tableRes: Restrictions) {
    let isAllowed = true;

    Object.keys(tableRes).forEach((key: string) => {
      if (rollRes.hasOwnProperty(key) && tableRes[key] !== rollRes[key]) {
        isAllowed = false;
      }
    });

    return isAllowed;
  }

  private findParts(entry: string) {
    const regex = /\[([a-zA-Z.]*)\]/g;
    const parts: string[] = [];
    let m;

    do {
      m = regex.exec(entry);

      if (m) {
        parts.push(m);
      }
    } while (m);

    return parts;
  }

  private subRoll(data: Entry[]) {
    const values: string[] = [];

    data.forEach((entry: Entry) => {
      if (entry.chance) {
        for (let i = 0; i < entry.chance; i++) {
          values.push(entry.value);
        }
      } else {
        values.push(entry.value);
      }
    });

    const roll: number = Math.round(Math.random() * (values.length - 1));

    return values[roll];
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
