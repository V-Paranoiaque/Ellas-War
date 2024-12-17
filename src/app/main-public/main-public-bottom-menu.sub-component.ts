import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-public-bottom-menu',
  templateUrl: './main-public-bottom-menu.sub-component.html',
  styleUrls: ['./main-public.component.css'],
  imports: [RouterModule, TranslateModule],
})
export class MainPublicBottomMenuSubComponent {
  constructor(public translate: TranslateService) {}
}
