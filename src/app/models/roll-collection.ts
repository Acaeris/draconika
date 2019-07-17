import { RollParts } from './roll-parts';

export interface RollCollection {
  version: string;
  init: string;
  name: string;
  library?: boolean;
  uses?: string[];
  parts: RollParts;
}
