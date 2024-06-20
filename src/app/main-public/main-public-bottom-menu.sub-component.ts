import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-public-bottom-menu',
  templateUrl: './main-public-bottom-menu.sub-component.html',
  styleUrls: ['./main-public.component.css'],
})
export class MainPublicBottomMenuSubComponent {
  constructor(public translate: TranslateService) {}
}
