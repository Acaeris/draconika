import { Component } from '@angular/core';
import { remote } from 'electron';
import { CampaignService } from '../../providers/campaign.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(private campaignService: CampaignService) {}

  newCampaign() {
    this.campaignService.clear();
  }

  fileOpen() {
    this.campaignService.open();
  }

  fileSave() {
    this.campaignService.save();
  }

  fileSaveAs() {
    this.campaignService.saveAs();
  }

  closeWindow() {
    remote.getCurrentWindow().close();
  }
}
