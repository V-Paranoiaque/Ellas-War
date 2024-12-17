import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { IcIconComponent } from 'src/services/ic-icon.service';

import dotCircle from '@iconify/icons-fa6-solid/circle-dot';

@Component({
  selector: 'app-attacks-spy-resources-help-popup',
  templateUrl: './attacks-spy-resources-help-popup.sub-component.html',
  styleUrls: ['./attacks.component.css'],
  imports: [IcIconComponent, TranslateModule],
})
export class AttacksSpyResourcesHelpPopupSubComponent {
  dotCircle = dotCircle;
}
