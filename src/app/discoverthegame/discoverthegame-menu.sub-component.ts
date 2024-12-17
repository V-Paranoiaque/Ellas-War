import { RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import circleIcon from '@iconify/icons-fa6-regular/circle';
import circleDot from '@iconify/icons-fa6-regular/circle-dot';

import { IcIconComponent } from 'src/services/ic-icon.service';

@Component({
  selector: 'app-discoverthegame-menu',
  templateUrl: './discoverthegame-menu.sub-component.html',
  imports: [IcIconComponent, RouterModule, TranslateModule],
})
export class DiscoverthegameMenuSubComponent {
  @Input()
  name!: string;

  circleIcon = circleIcon;
  circleDot = circleDot;
}
