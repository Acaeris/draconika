import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../providers/campaign.service';
import { Campaign } from '../../models/campaign';

@Component({
  selector: 'app-home',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private campaign: Campaign;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.campaign = this.campaignService.getCampaign();
  }

  save() {
    this.campaignService.setCampaign(this.campaign);
  }
}
