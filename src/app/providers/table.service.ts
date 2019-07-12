import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RollCollection } from '../models/roll-collection';
import * as fs from 'fs';

@Injectable()
export class TableService {
  constructor(private http: HttpClient) {}

  get(tableId: string): RollCollection {
    return JSON.parse(fs.readFileSync('src/assets/tables/' + tableId + '.json', 'utf8'));
  }
}
