import { Component, OnInit } from '@angular/core';
import { TableService } from '../../providers/table.service';
import { RollCollection } from '../../models/roll-collection';
import { Restrictions } from '../../models/restrictions';
import * as fs from 'fs';
import { RollService } from '../../providers/roll.service';
import { CampaignService } from '../../providers/campaign.service';
import { Entry } from '../../models/entry';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  output: string[] = [];
  restrictions: Restrictions = {};
  collection: RollCollection;
  options: string[][] = [];
  tables = {};
  showOptions: boolean;
  rolling = 'name';

  constructor(
    private tableService: TableService,
    private rollService: RollService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.loadTablenames();
    this.updateRestrictions(this.rolling);
    this.collection = this.tableService.get(this.rolling);
  }

  generate() {
    this.output.push(this.rollService.roll(this.rolling, 'init', this.restrictions));
  }

  clear() {
    this.output = [];
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
    this.updateRestrictions(this.rolling);
    this.collection = this.tableService.get(this.rolling);
  }

  updateRestrictions(tableName: string) {
    this.options = this.loadRestrictions(tableName);
    this.showOptions = Object.keys(this.options).length > 0;
  }

  loadRestrictions(tableName: string): any {
    const data: RollCollection = this.tableService.get(tableName);
    const options = [];

    for (const part in data.parts) {
      if (data.parts.hasOwnProperty(part)) {
        for (const table of data.parts[part]) {
          for (const restriction in table.restrictions) {
            if (table.restrictions.hasOwnProperty(restriction)) {
              if (!(restriction in options)) {
                options[restriction] = [];
              }

              table.restrictions[restriction].forEach((value: string) => {
                if (!options[restriction].includes(value)) {
                  options[restriction].push(value);
                }
              });
            }
          }
        }
      }
    }

    if (data.uses && data.uses.length > 0) {
      for (const library of data.uses) {
        const subOptions = this.loadRestrictions(library);

        for (const restriction in subOptions) {
          if (subOptions.hasOwnProperty(restriction) && options.hasOwnProperty(restriction)) {
            for (const entry of subOptions[restriction]) {
              if (!options[restriction].includes(entry)) {
                options[restriction].push(entry);
              }
            }
          } else if (subOptions.hasOwnProperty(restriction)) {
            options[restriction] = subOptions[restriction];
          }
        }
      }
    }

    return options;
  }
}
