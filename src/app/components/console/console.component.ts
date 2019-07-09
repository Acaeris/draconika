import { Component, OnInit } from '@angular/core';
import { TableService } from '../../providers/table.service';
import { RollCollection } from '../../models/roll-collection';
import { Restrictions } from '../../models/restrictions';
import * as fs from 'fs';

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
  tables: string[] = [];
  showOptions: boolean;
  rolling = 'name';

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.restrictions = {
      gender: 'female',
      race: 'kaldorei'
    };

    this.loadTablenames();
    this.tableService.get(this.rolling).subscribe(
      data => this.loadRestrictions(data),
      error => console.log(error)
    );
    this.update();
  }

  update() {
    this.tableService.roll(this.rolling, this.restrictions).subscribe(
      data => this.output.push(data),
      error => console.log(error)
    );
  }

  clear() {
    this.output = [];
  }

  setRestriction(key: string, value: string) {
    this.restrictions[key] = value;
  }

  loadTablenames() {
    fs.readdir('src/assets/tables', (err, dir) => {
      this.tables = [];

      for (const filePath of dir) {
        if (filePath.endsWith('json')) {
          this.tables.push(filePath.split('.')[0]);
        }
      }
    });
  }

  setTable(name: string) {
    this.rolling = name;
    this.tableService.get(this.rolling).subscribe(
      data => this.loadRestrictions(data),
      error => console.log(error)
    );
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
