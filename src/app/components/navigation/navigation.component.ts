import { Component } from '@angular/core';
import { remote } from 'electron';
import { writeFileSync } from 'fs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor() {}

  newCampaign() {
    console.log('Clear campaign data');
  }

  fileOpen() {
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      title: 'Select a campaign',
      filters: [{ name: 'Draconika Campaign', extensions: ['drake'] }],
      properties: ['openFile']
    }, (filePaths: string[], bookmarks: string[]) => {
      console.log(filePaths);
      console.log(bookmarks);
    });
  }

  fileSave() {
    console.log('Save current campaign data file');
  }

  fileSaveAs() {
    remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      title: 'Save campaign',
      filters: [{ name: 'Draconika Campaign', extensions: ['drake'] }]
    }, (filename: string) => {
      writeFileSync(filename, 'Hello World!', 'utf-8');
    });
  }

  closeWindow() {
    remote.getCurrentWindow().close();
  }
}
