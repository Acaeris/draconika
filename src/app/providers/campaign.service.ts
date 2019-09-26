import { Injectable } from '@angular/core';
import { remote } from 'electron';

import { Campaign } from '../models/campaign';
import { readFileSync, writeFileSync } from 'fs';
import { isNull } from 'util';

@Injectable()
export class CampaignService {
  private fileName: string;
  private default: Campaign = { name: 'New Campaign', notepad: '' };
  public campaign: Campaign = JSON.parse(JSON.stringify(this.default));

  setCampaign(campaign: Campaign) {
    this.campaign = campaign;
  }

  getCampaign(): Campaign {
    return JSON.parse(JSON.stringify(this.campaign));
  }

  clear() {
    this.campaign = JSON.parse(JSON.stringify(this.default));
    this.fileName = null;
  }

  open() {
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      title: 'Select a Campaign',
      filters: [{ name: 'Draconika Campaign', extensions: ['drake']}],
      properties: ['openFile']
    }, (filePaths: string[]) => {
      this.fileName = filePaths[0];
      this.campaign = JSON.parse(readFileSync(filePaths[0], 'utf-8'));
    });
  }

  saveAs() {
    remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      title: 'Save Campaign As...',
      filters: [{ name: 'Draconika Campaign', extensions: ['drake']}]
    }, (fileName: string) => {
      this.fileName = fileName;
      writeFileSync(fileName, JSON.stringify(this.campaign), 'utf-8');
    });
  }

  save() {
    if (this.fileName == null) {
      this.saveAs();
    } else {
      writeFileSync(this.fileName, JSON.stringify(this.campaign), 'utf-8');
    }
  }
}
