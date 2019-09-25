import { Component } from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CampaignService } from '../../providers/campaign.service';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent {
  public Editor = BalloonEditor;
  public campaign = {
    notepad: null
  };
  public notepadConfig = {
    placeholder: 'You can add your own notes here',
  };

  constructor(private campaignService: CampaignService) {}
}
