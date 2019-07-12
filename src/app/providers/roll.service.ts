import { Injectable } from '@angular/core';
import { TableService } from './table.service';
import { Restrictions } from '../models/restrictions';
import { RollCollection } from '../models/roll-collection';
import { Entry } from '../models/entry';
import { RollTable } from '../models/roll-table';

@Injectable()
export class RollService {
  options: Restrictions;

  constructor(private tables: TableService) {}

  roll(tableId: string, entryKey = 'init', restrictions: Restrictions = null) {
    if (restrictions != null) {
      this.options = restrictions;
    }

    return this.initRoll(this.tables.get(tableId), entryKey);
  }


  private initRoll(data: RollCollection, entryKey: string): string {
    entryKey = !data.parts.hasOwnProperty(entryKey) ? data.init : entryKey;
    return this.processRoll(data, entryKey);
  }

  private processRoll(data: RollCollection, entryKey: string): string {
    const mergeTable: string[] = this.fetchRolls(data, entryKey);
    let output = this.subRoll(mergeTable);

    const parts = this.findParts(output);

    if (parts.length > 0) {
      parts.forEach((part: string) => {
        if (part[1].includes('.')) {
          const splitPart = part[1].split('.');
          output = output.replace(part[0], this.roll(splitPart[0], splitPart[1]));
        } else if (data.parts.hasOwnProperty(part[1])) {
          output = output.replace(part[0], this.processRoll(data, part[1]));
        }
      });
    }

    return output;
  }

  private subRoll(entries: string[]): string {
    return entries[Math.round(Math.random() * (entries.length - 1))];
  }

  private fetchRolls(data: RollCollection, entryKey: string): string[] {
    const entries: string[] = [];

    data.parts[entryKey].forEach((rollTable: RollTable) => {
      if (typeof rollTable.restrictions === 'undefined' || this.checkRestrictions(rollTable.restrictions)) {
        rollTable.entries.forEach((entry: Entry) => {
          for (let i = 0; i < (entry.chance || 1); i++) {
            entries.push(entry.value);
          }
        });
      }
    });

    return entries;
  }

  private checkRestrictions(restrictions: Restrictions): boolean {
    let isAllowed = true;

    Object.keys(restrictions).forEach((key: string) => {
      if (this.options.hasOwnProperty(key) && restrictions[key] !== this.options[key]) {
        isAllowed = false;
      }
    });

    return isAllowed;
  }

  private findParts(output: string): string[] {
    const regex = /\[([a-zA-Z.]*)\]/g;
    const parts: string[] = [];
    let m;

    do {
      m = regex.exec(output);

      if (m) {
        parts.push(m);
      }
    } while (m);

    return parts;
  }
}
