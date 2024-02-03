import { Component, Input } from '@angular/core';

import circleIcon from '@iconify/icons-fa6-regular/circle';
import circleDot from '@iconify/icons-fa6-regular/circle-dot';

@Component({
  selector: 'app-discoverthegame-menu',
  templateUrl: './discoverthegame-menu.sub-component.html',
})
export class DiscoverthegameMenuSubComponent {
  @Input()
  name!: string;

  circleIcon = circleIcon;
  circleDot = circleDot;
}
