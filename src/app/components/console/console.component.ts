import { Component, OnInit } from '@angular/core';
import { TableService } from '../../providers/table.service';
import { RollCollection } from '../../models/roll-collection';
import { Restrictions } from '../../models/restrictions';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  output: string[] = [];
  restrictions: Restrictions = {};
  collection: RollCollection;
  rolling = 'name';

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.restrictions = {
      gender: 'female',
      race: 'kaldorei'
    };

    this.update();
  }

  update() {
    this.tableService.roll(this.rolling, this.restrictions).subscribe(
      data => this.output.push(data),
      error => console.log(error)
    );
  }
}
