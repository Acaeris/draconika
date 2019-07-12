import { Entry } from './entry';
import { Restrictions } from './restrictions';

export interface RollTable {
  restrictions?: Restrictions;
  entries: Entry[];
}
