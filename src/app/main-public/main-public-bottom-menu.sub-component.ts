import { Component, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-public-bottom-menu',
  templateUrl: './main-public-bottom-menu.sub-component.html',
  styleUrls: ['./main-public.component.css'],
  imports: [RouterModule, TranslateDirective, TranslatePipe],
})
export class MainPublicBottomMenuSubComponent {
  translate = inject(TranslateService);
}
