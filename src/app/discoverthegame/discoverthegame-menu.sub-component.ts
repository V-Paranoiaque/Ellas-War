import { RouterModule } from '@angular/router';
import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import circleIcon from '@iconify/icons-fa6-regular/circle';
import circleDot from '@iconify/icons-fa6-regular/circle-dot';

import { IcIconComponent } from '../../services/ic-icon.service';

@Component({
  selector: 'app-discoverthegame-menu',
  templateUrl: './discoverthegame-menu.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IcIconComponent, RouterModule],
})
export class DiscoverthegameMenuSubComponent {
  translate = inject(TranslateService);

  @Input()
  name!: string;

  circleIcon = circleIcon;
  circleDot = circleDot;
}
