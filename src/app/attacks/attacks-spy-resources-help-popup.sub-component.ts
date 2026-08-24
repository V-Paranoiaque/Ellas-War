import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';

import { IcIconComponent } from '../../services/ic-icon.service';

import dotCircle from '@iconify/icons-fa6-solid/circle-dot';

@Component({
  selector: 'app-attacks-spy-resources-help-popup',
  templateUrl: './attacks-spy-resources-help-popup.sub-component.html',
  styleUrls: ['./attacks.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IcIconComponent, TranslateDirective],
})
export class AttacksSpyResourcesHelpPopupSubComponent {
  dotCircle = dotCircle;
}
