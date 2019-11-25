import { RollParts } from './roll-parts';
import { RollSet } from './roll-set';

export interface RollCollection {
  version: string;
  init: string;
  name: string;
  library?: boolean;
  uses?: string[];
  parts: RollParts;
  set: RollSet;
}
