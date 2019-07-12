import { Component, OnInit } from '@angular/core';
import { TableService } from '../../providers/table.service';
import { RollCollection } from '../../models/roll-collection';
import { Restrictions } from '../../models/restrictions';
import * as fs from 'fs';
import { RollService } from '../../providers/roll.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  output: string[] = [];
  restrictions: Restrictions = {};
  collection: RollCollection;
  options: string[][] = [];
  tables = {};
  showOptions: boolean;
  rolling = 'name';

  constructor(private tableService: TableService, private rollService: RollService) {}

  ngOnInit() {
    this.loadTablenames();
    this.loadRestrictions(this.tableService.get(this.rolling));
  }

  update() {
    this.output.push(this.rollService.roll(this.rolling, 'init', this.restrictions));
  }

  clear() {
    this.output = [];
  }

  setRestriction(key: string, value: string) {
    if (value !== '') {
      this.restrictions[key] = value;
    } else {
      delete this.restrictions[key];
    }
  }

  loadTablenames() {
    fs.readdir('src/assets/tables', (err, dir) => {
      this.tables = [];

      for (const filePath of dir) {
        if (filePath.endsWith('json')) {
          const fileName = filePath.split('.')[0];
          const collection = this.tableService.get(fileName);

          if (typeof collection.library === 'undefined' || !collection.library) {
            this.tables[fileName] = this.tableService.get(fileName).name;
          }
        }
      }
    });
  }

  setTable(name: string) {
    this.rolling = name;
    this.loadRestrictions(this.tableService.get(this.rolling));
  }

  loadRestrictions(data: RollCollection) {
    this.options = [];
    for (const part in data.parts) {
      if (data.parts.hasOwnProperty(part)) {
        for (const table of data.parts[part]) {
          for (const restriction in table.restrictions) {
            if (table.restrictions.hasOwnProperty(restriction)) {
              if (!(restriction in this.options)) {
                this.options[restriction] = [];
              }

              if (!this.options[restriction].includes(table.restrictions[restriction])) {
                this.options[restriction].push(table.restrictions[restriction]);
              }
            }
          }
        }
      }
    }

    this.showOptions = Object.keys(this.options).length > 0;
  }
}
